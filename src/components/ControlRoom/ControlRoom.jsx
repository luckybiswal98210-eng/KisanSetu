import React from 'react';
import { 
  ChevronRight, 
  ArrowUpRight, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Sparkles,
  Layers,
  Building2,
  Calendar,
  Truck
} from 'lucide-react';
import { I18N_STRINGS } from '../../data/mockData';

export default function ControlRoom({ 
  demandData, 
  supplyMatches, 
  supplyHealth, 
  recentSignals, 
  currentLang,
  openPostDemandModal,
  openSimulatorModal,
  setActiveTab,
  onSelectFpoMatch
}) {
  const t = I18N_STRINGS[currentLang] || I18N_STRINGS.en;

  const farmerBarPct = Math.round((demandData.platformPrice / demandData.totalEndPrice) * 100);
  const logisticsBarPct = 100 - farmerBarPct;

  return (
    <div className="control-room-view">
      {/* 1. Hero Scenario Card */}
      <div className="hero-scenario-card">
        <div>
          <div className="hero-badge">
            <span className="dot" style={{ width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', display: 'inline-block' }}></span>
            <span>ACTIVE PROCUREMENT PIPELINE</span>
          </div>
          <h2 className="hero-title">
            {demandData.buyerName.split(' ')[0]} · {demandData.targetQuantity} tonnes of {demandData.crop}
          </h2>
          <p className="hero-subtitle">
            {demandData.location} · Delivery within {demandData.deliveryWindowDays} days · maximum procurement price ₹{demandData.targetPricePerKg}/kg
          </p>
        </div>

        <button className="hero-action-btn" onClick={openPostDemandModal}>
          <span>{t.postNewDemand}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* 2. KPI Metrics Grid */}
      <div className="kpi-grid">
        {/* Metric 1 */}
        <div className="kpi-card blue">
          <div className="kpi-label">{demandData.buyerName.split(' ')[0]} demand</div>
          <div className="kpi-value">{demandData.targetQuantity} t</div>
          <div className="kpi-subtext">{demandData.id} · {demandData.status}</div>
        </div>

        {/* Metric 2 */}
        <div className="kpi-card amber">
          <div className="kpi-label">{t.verifiedSupply}</div>
          <div className="kpi-value">{demandData.verifiedSupply} t</div>
          <div className="kpi-subtext">3 verified sources</div>
        </div>

        {/* Metric 3 */}
        <div className="kpi-card red">
          <div className="kpi-label">{t.currentGap}</div>
          <div className="kpi-value">{demandData.currentGap} t</div>
          <div className="kpi-subtext">Replacement search ready</div>
        </div>

        {/* Metric 4 */}
        <div className="kpi-card green">
          <div className="kpi-label">{t.farmerRealization}</div>
          <div className="kpi-value highlight-green">+₹{demandData.farmerRealizationBonus.toFixed(2)}/kg</div>
          <div className="kpi-subtext">Estimate vs traditional route</div>
        </div>
      </div>

      {/* 3. Middle 2-Column Section */}
      <div className="two-col-grid">
        {/* Left Column: Explainable Supply Matches */}
        <div className="content-card">
          <div className="card-header-row">
            <div>
              <span className="card-header-meta">MATCH ENGINE · EXPLAINABLE</span>
              <h3 className="card-header-title">{t.explainableMatches}</h3>
            </div>
            <span 
              className="card-header-link" 
              onClick={() => setActiveTab('supply_matching')}
            >
              View all <ChevronRight size={14} />
            </span>
          </div>

          <div className="match-list">
            {supplyMatches.slice(0, 3).map((match, idx) => (
              <div 
                key={match.id} 
                className="match-item"
                onClick={() => onSelectFpoMatch && onSelectFpoMatch(match)}
                title="Click to view full batch and fulfillment details"
              >
                <div className="match-left">
                  <div className="match-circle-score">
                    <span className="score-num">{match.matchScore}</span>
                    <span className="score-pct">%</span>
                  </div>
                  <div className="match-info">
                    <h4>{match.fpoName}</h4>
                    <div className="match-sub">
                      {match.quantityTonnes} tonnes · {match.grade} · {match.location.split(' ')[0]}
                    </div>
                    <div className="match-meta">
                      {match.daysToHarvest} days to harvest · {match.supplyConfidence}% supply confidence
                    </div>
                  </div>
                </div>

                <div className="match-right">
                  <div className="rank-badge">#{idx + 1}</div>
                  <div className="match-factors">{match.keyMatchFactors}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Price Transparency */}
        <div className="content-card">
          <div className="card-header-row">
            <div>
              <span className="card-header-meta">{t.priceTransparency}</span>
              <h3 className="card-header-title">{t.wherePriceGoes}</h3>
            </div>
            <TrendingUp size={18} color="#15803d" />
          </div>

          {/* Stacked Progress Bar */}
          <div className="price-breakdown-bar">
            <div className="bar-farmer" style={{ width: `${farmerBarPct}%` }} title={`Farmer Share: ₹${demandData.platformPrice}/kg`}></div>
            <div className="bar-logistics" style={{ width: `${logisticsBarPct}%` }} title={`Logistics & Grading: ₹${demandData.logisticsFee}/kg`}></div>
          </div>

          {/* Numeric Breakdown */}
          <div className="price-numbers-row">
            <div className="price-num-box">
              <h3>₹{demandData.platformPrice.toFixed(2)}</h3>
              <p>{t.farmerRealizationSub}</p>
            </div>
            <div className="price-num-box" style={{ textAlign: 'right' }}>
              <h3>₹{demandData.logisticsFee.toFixed(2)}</h3>
              <p>{t.collectionLogistics}</p>
            </div>
          </div>

          {/* Traditional Baseline */}
          <div className="traditional-diff-box">
            <span>{t.traditionalChannel} <strong>₹{demandData.traditionalPrice.toFixed(2)}/kg</strong></span>
            <span className="gain-badge">+₹{demandData.farmerRealizationBonus.toFixed(2)} potential improvement</span>
          </div>

          {/* Open Simulator Button */}
          <button className="simulator-btn" onClick={openSimulatorModal}>
            <Sparkles size={15} />
            <span>{t.openSimulator}</span>
          </button>
        </div>
      </div>

      {/* 4. Bottom 2-Column Section: Supply Health & Recent Activity */}
      <div className="two-col-grid">
        {/* Supply Health */}
        <div className="content-card">
          <div className="card-header-row">
            <div>
              <span className="card-header-meta">{t.supplyHealth}</span>
              <h3 className="card-header-title">{t.expectedVerifiedAvailable}</h3>
            </div>
            <Shield size={18} color="#15803d" />
          </div>

          <div className="health-bars">
            <div className="health-row">
              <span className="health-label">Expected</span>
              <span className="health-num">{supplyHealth.expectedTonnes} t</span>
              <div className="health-track">
                <div className="health-fill" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="health-row">
              <span className="health-label">Verified</span>
              <span className="health-num">{supplyHealth.verifiedTonnes} t</span>
              <div className="health-track">
                <div className="health-fill" style={{ width: `${(supplyHealth.verifiedTonnes / supplyHealth.expectedTonnes) * 100}%` }}></div>
              </div>
            </div>

            <div className="health-row">
              <span className="health-label">Available</span>
              <span className="health-num">{supplyHealth.availableTonnes} t</span>
              <div className="health-track">
                <div className="health-fill" style={{ width: `${(supplyHealth.availableTonnes / supplyHealth.expectedTonnes) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Signals */}
        <div className="content-card">
          <div className="card-header-row">
            <div>
              <span className="card-header-meta">{t.recentActivity}</span>
              <h3 className="card-header-title">{t.signalsAttention}</h3>
            </div>
            <AlertCircle size={18} color="#475569" />
          </div>

          <div className="signal-list">
            {recentSignals.map((sig) => (
              <div key={sig.id} className="signal-item">
                <div className={`signal-dot ${sig.type}`}></div>
                <div className="signal-content">
                  <div className="signal-title">{sig.title}</div>
                  <div className="signal-time">{sig.timeAgo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
