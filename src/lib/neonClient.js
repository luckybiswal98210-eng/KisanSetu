import { neon } from '@neondatabase/serverless';

// Retrieve database URL from Vite env or process env
const databaseUrl = 
  import.meta.env?.VITE_NEON_DATABASE_URL || 
  import.meta.env?.DATABASE_URL || 
  (typeof process !== 'undefined' ? process.env?.DATABASE_URL : null);

/**
 * Neon Serverless PostgreSQL Query Function
 * Executes raw parameterized queries directly over HTTP/WebSocket
 * Uses neon tagged template literal syntax for safe parameterized queries
 */
export const sql = databaseUrl ? neon(databaseUrl) : null;

/**
 * Robust database query wrapper with fallback to offline mock dataset
 * Uses the Neon tagged template literal format: sql`SELECT...` or sql(query, params) for parameterized
 */
export async function executeNeonQuery(queryText, params = []) {
  if (!sql) {
    console.info('ℹ️ Neon Database: Running in offline/mock mode. Set VITE_NEON_DATABASE_URL in .env to connect to live Neon Postgres cluster.');
    return { success: false, mode: 'mock', data: null };
  }

  try {
    // Use sql() as a tagged function for parameterized queries
    // The neon() client supports both tagged templates and function call syntax
    const result = await sql(queryText, params);
    return { success: true, mode: 'live_neon', data: result };
  } catch (error) {
    console.warn('⚠️ Neon Database Query Warning (using local fallback):', error.message);
    return { success: false, error: error.message, data: null };
  }
}

/**
 * Helper to test Neon Connection Health
 */
export async function checkNeonConnection() {
  if (!sql) return { connected: false, message: 'DATABASE_URL not configured' };
  try {
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name;`;
    return { connected: true, timestamp: result[0]?.current_time, database: result[0]?.db_name };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}
