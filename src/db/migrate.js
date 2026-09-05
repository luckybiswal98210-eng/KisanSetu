import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { neon } from '@neondatabase/serverless';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to read .env file if process.env is not set
function getDatabaseUrl() {
  if (process.env.VITE_NEON_DATABASE_URL) return process.env.VITE_NEON_DATABASE_URL;
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  
  const envPath = path.resolve(__dirname, '../../.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/VITE_NEON_DATABASE_URL\s*=\s*([^\r\n]+)/);
    if (match && match[1]) {
      return match[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  return null;
}

const databaseUrl = getDatabaseUrl();
if (!databaseUrl) {
  console.error('❌ Error: VITE_NEON_DATABASE_URL is not defined in environment or .env file.');
  console.error('👉 Please add VITE_NEON_DATABASE_URL=postgresql://... to your .env file.');
  process.exit(1);
}

console.log('🚀 Connecting to Neon.tech Serverless PostgreSQL...');
const sql = neon(databaseUrl);

async function runMigration() {
  try {
    // 1. Test basic connectivity
    const ping = await sql`SELECT NOW() as current_time, current_database() as db_name, version() as pg_version;`;
    console.log('✅ Connected successfully to Neon Postgres!');
    console.log(`   Database: ${ping[0].db_name}`);
    console.log(`   Server Time: ${ping[0].current_time}`);
    console.log(`   Version: ${ping[0].pg_version.split(' ')[0]} ${ping[0].pg_version.split(' ')[1]}`);

    // 2. Read and execute schema.sql
    console.log('\n📄 Executing schema.sql...');
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    
    // Strip multi-line and single-line comments
    const cleanSchema = schemaSql
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/--.*$/gm, '');

    const statements = cleanSchema
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of statements) {
      if (stmt) {
        await sql.query(stmt);
      }
    }
    console.log(`✅ Schema created successfully (${statements.length} DDL statements executed)!`);

    // 3. Read and execute seed.sql
    console.log('\n🌱 Executing seed.sql...');
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    const cleanSeed = seedSql
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/--.*$/gm, '');

    const seedStatements = cleanSeed
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const stmt of seedStatements) {
      if (stmt) {
        await sql.query(stmt);
      }
    }
    console.log(`✅ Seed data inserted successfully (${seedStatements.length} statements executed)!`);

    // 4. Verify table counts
    console.log('\n📊 Verifying Database Records:');
    const userCount = await sql`SELECT count(*) as count FROM users;`;
    const fpoCount = await sql`SELECT count(*) as count FROM fpos;`;
    const farmerCount = await sql`SELECT count(*) as count FROM farmers;`;
    const predictionCount = await sql`SELECT count(*) as count FROM price_predictions;`;

    console.log(`   - users: ${userCount[0].count} records`);
    console.log(`   - fpos: ${fpoCount[0].count} records`);
    console.log(`   - farmers: ${farmerCount[0].count} records`);
    console.log(`   - price_predictions: ${predictionCount[0].count} records`);

    console.log('\n🎉 Neon Serverless PostgreSQL Database is 100% LIVE and POPULATED!');
  } catch (error) {
    console.error('❌ Migration Error:', error);
    process.exit(1);
  }
}

runMigration();
