-- ============================================================================
-- KisanSetu | Neon.tech Serverless PostgreSQL Seed Data
-- ============================================================================

-- 1. Insert Stakeholder Users
INSERT INTO users (id, name, email, phone, role, role_label, location, kyc_status, bank_account, upi_id)
VALUES
('usr-admin-01', 'Lucky Biswal', 'admin@kisansetu.gov.in', '+91 98210-00001', 'admin', 'Master Platform Administrator', 'New Delhi, India', 'Verified (Master Controller)', 'SBI Commercial A/C •••• 9999', 'admin@sbi'),
('usr-fpo-01', 'Sahyadri Bio FPO Lead', 'lead@sahyadrifpo.org', '+91 94222-11880', 'fpo', 'Farmer Producer Organization (FPO)', 'Nashik, Maharashtra', 'Verified (CIN: FPO-MH-2021-0089)', 'Bank of Maharashtra •••• 4421', 'sahyadri@bom'),
('usr-farmer-01', 'Balasaheb Shinde', 'balasaheb.farmer@kisansetu.in', '+91 98221-49210', 'farmer', 'Individual Smallholder Farmer', 'Dindori, Nashik, Maharashtra', 'Verified (Aadhaar KYC Pass)', 'SBI Agri A/C •••• 4921', 'balasaheb@sbi'),
('usr-buyer-01', 'Reliance Fresh Retail Procurement', 'procure@reliancefresh.com', '+91 98200-44910', 'company', 'Company / Enterprise Buyer', 'Mumbai Central Logistics Hub', 'Verified (GSTIN: 27AAACR1234F1Z8)', 'HDFC Corporate Escrow •••• 8820', 'reliance@hdfc'),
('usr-consumer-01', 'Priya Sharma', 'priya.sharma@gmail.com', '+91 97654-32100', 'consumer', 'Retail Consumer / Household', 'Andheri West, Mumbai, Maharashtra', 'Verified (Phone OTP)', 'ICICI Bank •••• 1102', 'priyasharma@icici')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert FPO Hubs
INSERT INTO fpos (id, name, district, state, primary_crops, active_farmers_count, packhouse_capacity_tonnes, contact_phone, manager_name)
VALUES
('FPO-MH-01', 'Sahyadri Agro Producer Co.', 'Nashik', 'Maharashtra', 'Tomatoes, Grapes, Onions', 520, 150.00, '+91 94222-11880', 'Vilas Shinde'),
('FPO-MH-02', 'Niphad Farmers Cooperative', 'Nashik', 'Maharashtra', 'Onions, Tomatoes, Pomegranates', 380, 90.00, '+91 94230-88192', 'Suresh Kadam'),
('FPO-MH-03', 'Sinnar Kisan Samruddhi FPO', 'Nashik', 'Maharashtra', 'Onions, Baby Corn, Green Chillies', 290, 75.00, '+91 97654-77889', 'Pandurang Pawar'),
('FPO-MH-04', 'Dindori Organic Valley FPO', 'Nashik', 'Maharashtra', 'Seedless Grapes, Export Tomatoes', 410, 120.00, '+91 98221-49210', 'Dnyaneshwar Shinde'),
('FPO-MH-05', 'Baramati Krushak FPO', 'Pune', 'Maharashtra', 'Sugar Cane, Table Tomatoes', 340, 80.00, '+91 98220-33441', 'Rajesh Patil'),
('FPO-KA-01', 'Belagavi Horticulture Farmer Co.', 'Belagavi', 'Karnataka', 'Green Chillies, Tomatoes', 310, 70.00, '+91 98450-11223', 'Basavaraj Patil')
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Farmers
INSERT INTO farmers (id, fpo_id, name, village, district, state, land_acres, primary_crop, harvest_kg, bank_payout, mandi_rate, platform_rate, status)
VALUES
('F-101', 'FPO-MH-04', 'Dnyaneshwar Shinde', 'Dindori', 'Nashik', 'Maharashtra', 3.2, 'Grade-A Roma Tomatoes', 3200, '₹76,160', 18.00, 23.80, 'Harvest Ready'),
('F-102', 'FPO-MH-02', 'Balasaheb Jadhav', 'Niphad', 'Nashik', 'Maharashtra', 4.5, 'Hybrid Roma Tomatoes', 4500, '₹1,07,100', 17.60, 23.80, 'In Transit to Hub'),
('F-103', 'FPO-MH-01', 'Kavita Gaikwad', 'Chandwad', 'Nashik', 'Maharashtra', 2.5, 'Organic Spinach & Coriander', 2800, '₹66,640', 16.30, 23.80, 'Inspection Scheduled'),
('F-104', 'FPO-MH-03', 'Pandurang Pawar', 'Sinnar', 'Nashik', 'Maharashtra', 6.0, 'Nashik Red Onions (GI Tagged)', 5100, '₹1,21,380', 18.90, 23.80, 'Payout Settled')
ON CONFLICT (id) DO NOTHING;

-- 4. Insert 7-Day AI Price Forecasts
INSERT INTO price_predictions (crop, current_price, trend_direction, percentage_change, alert_type, market_intelligence_signal)
VALUES
('Roma Tomatoes', 23.80, 'Down (-29.4% in 7 Days)', -29.4, 'warning_drop', 'CRITICAL MARKET SIGNAL: Gujarat & Karnataka arrivals surging +45% starting Wednesday. Severe price glut expected. FPOs advised to harvest and clear stock within 48-72h.'),
('Nashik Red Onions (55mm)', 32.00, 'Up (+20.3% in 7 Days)', 20.3, 'opportunity_surge', 'HIGH DEMAND SURGE: Southern export terminals in Chennai & Cochin reporting deficit. Quality batches should be staggered for premium realization.'),
('Process-Grade Potatoes', 18.50, 'Stable (±3% Variance)', -3.2, 'stable', 'STABLE TRADING: Cold storage release in Agra & Indore matching processing demand. Standard contract pricing recommended.'),
('Dindori Seedless Grapes', 72.00, 'Up (+22.2% in 7 Days)', 22.2, 'opportunity_surge', 'EXPORT BOOM: European & GCC buyer demand opening up for 18° Brix certified batches. Pre-cooling reservations advised.');
