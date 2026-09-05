-- ============================================================================
-- KisanSetu | Neon.tech Serverless PostgreSQL Database Schema
-- Smart India Hackathon (SIH) - Demand-Driven Agri-Infrastructure OS
-- ============================================================================

-- 1. Users & Stakeholder Registry (5 Personas)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('fpo', 'farmer', 'company', 'consumer', 'admin')),
    role_label VARCHAR(100),
    location VARCHAR(255),
    kyc_status VARCHAR(50) DEFAULT 'Verified',
    bank_account VARCHAR(100),
    upi_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. FPO Regional Hubs & Cooperative Registry
CREATE TABLE IF NOT EXISTS fpos (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    primary_crops TEXT NOT NULL,
    active_farmers_count INTEGER DEFAULT 0,
    packhouse_capacity_tonnes NUMERIC(10, 2) DEFAULT 0.00,
    contact_phone VARCHAR(20),
    manager_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Smallholder Farmers & Landholdings
CREATE TABLE IF NOT EXISTS farmers (
    id VARCHAR(50) PRIMARY KEY,
    fpo_id VARCHAR(50) REFERENCES fpos(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    land_acres NUMERIC(6, 2) NOT NULL,
    primary_crop VARCHAR(100) NOT NULL,
    harvest_kg NUMERIC(10, 2) DEFAULT 0.00,
    bank_payout VARCHAR(50),
    bank_account VARCHAR(100),
    mandi_rate NUMERIC(8, 2),
    platform_rate NUMERIC(8, 2),
    status VARCHAR(50) DEFAULT 'Harvest Ready',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Corporate Buyer Bulk Demands
CREATE TABLE IF NOT EXISTS demands (
    id VARCHAR(50) PRIMARY KEY,
    buyer_id VARCHAR(50) REFERENCES users(id),
    buyer_name VARCHAR(255) NOT NULL,
    crop VARCHAR(100) NOT NULL,
    target_quantity_tonnes NUMERIC(10, 2) NOT NULL,
    target_price_per_kg NUMERIC(8, 2) NOT NULL,
    delivery_window_days INTEGER NOT NULL,
    destination_city VARCHAR(100) NOT NULL,
    escrow_status VARCHAR(50) DEFAULT 'Pre-Funded & Locked',
    status VARCHAR(50) DEFAULT 'Active Bidding',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Consumer Household Produce Requests (2-Tier Routing)
CREATE TABLE IF NOT EXISTS consumer_requests (
    id VARCHAR(50) PRIMARY KEY,
    consumer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    total_crates INTEGER NOT NULL,
    total_kg NUMERIC(10, 2) NOT NULL,
    assigned_fpo VARCHAR(255),
    routing_tier VARCHAR(50) DEFAULT '1st Preference: Smallholder Farmer',
    status VARCHAR(50) DEFAULT 'Pending Admin Approval',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Platform Inquiries & FPO Quotations Handshake
CREATE TABLE IF NOT EXISTS platform_inquiries (
    id VARCHAR(50) PRIMARY KEY,
    request_id VARCHAR(50) NOT NULL,
    request_type VARCHAR(50) NOT NULL,
    requester_name VARCHAR(255) NOT NULL,
    crop VARCHAR(100) NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    quantity_kg NUMERIC(10, 2) NOT NULL,
    target_district VARCHAR(100) NOT NULL,
    target_fpo_id VARCHAR(50) REFERENCES fpos(id),
    target_fpo_name VARCHAR(255) NOT NULL,
    status VARCHAR(100) DEFAULT 'Broadcasted (Pending FPO Quote)',
    fpo_quote_price NUMERIC(8, 2),
    admin_approved BOOLEAN DEFAULT FALSE,
    selected_logistics VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Escrow Vault & Payment Ledger
CREATE TABLE IF NOT EXISTS escrow_transactions (
    id VARCHAR(50) PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL,
    buyer_id VARCHAR(50) REFERENCES users(id),
    fpo_id VARCHAR(50) REFERENCES fpos(id),
    total_amount NUMERIC(12, 2) NOT NULL,
    platform_fee NUMERIC(10, 2) NOT NULL,
    farmer_payout NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Locked in Vault',
    released_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. 7-Day Short-Term AI Price Predictions
CREATE TABLE IF NOT EXISTS price_predictions (
    id SERIAL PRIMARY KEY,
    crop VARCHAR(100) NOT NULL,
    current_price NUMERIC(8, 2) NOT NULL,
    trend_direction VARCHAR(100) NOT NULL,
    percentage_change NUMERIC(5, 2) NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    market_intelligence_signal TEXT NOT NULL,
    forecast_date DATE DEFAULT CURRENT_DATE
);
