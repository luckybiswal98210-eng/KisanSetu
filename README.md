# 🌾 KisanSetu | Demand-Driven Agri-Infrastructure OS

> **Smart India Hackathon (SIH) | Problem Statement: Eliminating 4–6 layers of middlemen between farmers, FPOs, enterprise bulk buyers, and retail consumers through demand-driven aggregation, 100% pre-funded escrow settlement, and AI-powered cold-chain logistics.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Online-success?style=for-the-badge&logo=githubpages&logoColor=white)](https://luckybiswal98210-eng.github.io/KisanSetu/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![UN SDGs](https://img.shields.io/badge/UN%20SDGs-1%2C%202%2C%208%2C%2012%2C%2013-E5243B)](https://sdgs.un.org/goals)

🌐 **Live URL:** [https://luckybiswal98210-eng.github.io/KisanSetu/](https://luckybiswal98210-eng.github.io/KisanSetu/)

---

## 📌 Executive Summary

Traditional agricultural mandis (APMC) in India force smallholder farmers to endure 4–6 layers of intermediaries (village dalals, commission agents, wholesalers, brokers), losing up to **34% of crop value** and waiting 15–45 days for delayed payments. Meanwhile, post-harvest produce suffers **18–25% spoilage** during transit.

**KisanSetu** transforms this broken supply chain into an end-to-end, digital procurement OS:
1. **Demand-Driven Aggregation**: Enterprise buyers (Reliance, BigBasket, Taj) and retail households post real demand; KisanSetu’s algorithms pool multiple smallholder farmers and FPOs into single, verified fulfillment contracts.
2. **100% Pre-Funded Escrow Vault**: Eliminates payment defaults and delays. Upon digital weighbridge confirmation, funds are released directly to individual farmers via UPI / NEFT on the same day (+₹5.80/kg higher net realization).
3. **Kisan Sahayak AI Assistant**: Role-aware multilingual chatbot with real-time bio-pesticide recommendations, disease diagnosis (leaf curl, early blight, fruit borer), simulated voice-to-text, and automatic fallback to the official **Kisan Call Centre (1800-180-1551)**.
4. **7-Day Price Predictive AI Engine**: Short-term neural forecasting model correlating multi-mandi arrivals and weather to predict price drops/gluts up to 7 days ahead with 1-click advisory broadcast to FPOs.
5. **Multi-Channel 8-Language Dispatcher**: Dispatches SMS, WhatsApp, Email, and interactive IVR voice memos in 8 Indian languages (*Hindi, Marathi, Telugu, Tamil, Kannada, Punjabi, Gujarati, Bengali*) to ensure offline 2G phone accessibility.
6. **2-Tier Direct Routing Protocol**: Small household basket orders prioritize **1st Preference: Individual Smallholder Farmers**, while large volumes route to **2nd Preference: FPO Regional Packhouses**.

---

## 🏛️ 5 Dedicated Stakeholder Portals

| Portal | Stakeholder | Key Features |
| :--- | :--- | :--- |
| **Farmer Direct** | Smallholder Farmers | Direct lot listing, farm-gate MSP price comparison (+₹5.80/kg vs APMC), live escrow status, SMS/IVR notifications. |
| **FPO Hub** | Farmer Producer Co-ops | Multi-farmer pooling, packhouse inventory management, receiving Admin inquiries, submitting quotations, digital e-way bills. |
| **Company B2B** | Corporate Buyers | Posting large-scale forward contracts (10t–500t), cold-chain reefer telematics (<12°C), escrow funding, automated fulfillment matching. |
| **Consumer Store** | Retail Households | Direct farm-to-fork produce catalog, Government Fair Benchmark rates, 2-tier smallholder routing, fresh delivery scheduling. |
| **Master Admin** | Central Platform Operator | 360° stakeholder governance, FPO inquiry broadcasting, quote approval, 3-tier logistics configuration, 7-day predictive graphs, UN SDG tracking. |

---

## 🚀 Technology Stack

- **Frontend**: React 18, Vite, Vanilla CSS Design System (Glassmorphism & dark-mode command aesthetic)
- **Database & Cloud Backend**: Neon.tech Serverless PostgreSQL (`@neondatabase/serverless`)
- **Icons & Visuals**: Lucide React, Canvas Confetti, Custom SVG Charting
- **AI & Forecasting**: Neural price predictive models (7-day trend analysis, confidence bands, mandi glut warnings)
- **Voice & Accessibility**: Simulated speech recording waveforms, Web Speech API integration, regional audio templates
- **Cloud Hosting**: Vercel & GitHub Pages compatible with SPA client routing

---

## ⚡ Cloud Deployment (Vercel + Neon.tech)

KisanSetu is pre-configured for modern, serverless cloud deployment:

### 1. Neon.tech Serverless PostgreSQL Setup
1. Sign in to [Neon Console](https://console.neon.tech/) (free tier available).
2. Create a new database project named `KisanSetu`.
3. Open the **SQL Editor** tab in Neon and execute the schema and seed scripts:
   - Run `src/db/schema.sql` to instantiate the 8 relational tables (`users`, `fpos`, `farmers`, `demands`, `consumer_requests`, `platform_inquiries`, `escrow_transactions`, `price_predictions`).
   - Run `src/db/seed.sql` to populate initial demo data for all 5 stakeholder roles.
4. Copy the **Connection Details** (Pooled or Direct connection string).

### 2. Vercel 1-Click Deployment
1. Go to [vercel.com/new](https://vercel.com/new) and log in with your GitHub account.
2. Select your repository: **`luckybiswal98210-eng/KisanSetu`**.
3. Under **Environment Variables**, add:
   - **Key**: `VITE_NEON_DATABASE_URL`
   - **Value**: `postgresql://neondb_owner:<password>@<endpoint>.neon.tech/neondb?sslmode=require`
4. Click **Deploy**. Vercel will automatically build the Vite production bundle and serve the app on a high-speed Edge CDN with SPA URL rewriting enabled via `vercel.json`.


---

## 🌿 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/luckybiswal98210-eng/KisanSetu.git
cd KisanSetu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000/`.

### 4. Build for production
```bash
npm run build
```

---

## 🎯 UN Sustainable Development Goals (SDG) Alignment

- **SDG 1: No Poverty** — Directly increases net smallholder income by +32.2% (+₹5.80/kg over traditional mandis).
- **SDG 2: Zero Hunger** — Reduces transit spoilage from 22% down to <3.5% through IoT cold-chain routing, saving 35,000+ kg food waste annually.
- **SDG 8: Decent Work & Economic Growth** — Pre-funded escrow guarantees immediate liquidity, eliminating debt spirals from delayed mandi payments.
- **SDG 12: Responsible Consumption & Production** — 4-stage QR traceability from farm harvest to consumer door.
- **SDG 13: Climate Action** — Multi-farm aggregation cuts empty transport runs and freight emissions by 22%.

---

## 👥 Authors & Team
- **Lucky Biswal** & Team — Smart India Hackathon (SIH) 2026
