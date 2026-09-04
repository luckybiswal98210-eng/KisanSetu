import React, { useState } from 'react';
import { 
  MapPin, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Compass,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { REGIONAL_ANALYTICS } from '../../data/mockData';

export default function RegionalAnalyticsView({ onApplyRecommendation }) {
  const [clusters, setClusters] = useState(REGIONAL_ANALYTICS.clusters);
  const [rerouted, setRerouted] = useState(false);
  const intel = REGIONAL_ANALYTICS.intelligenceForecast;

  const handleReroute = () => {
    setRerouted(true);
    // Simulate updating Nashik's gap by taking 60t from Pune's surplus
    setClusters(prev => prev.map(c => {
      if (c.name === 'Nashik') {
        return { ...c, verifiedSupplyTonnes: 480, gapTonnes: 20 };
      }
      if (c.name === 'Pune') {
        return { ...c, verifiedSupplyTonnes: 320, gapTonnes: 20 };
      }
      return c;
    }));
  };

  return (
    <div className="regional-analytics-view">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <span className="card-header-meta">DEMAND-SUPPLY INTELLIGENCE</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 className="page-title" style={{ fontSize: '24px', margin: '4px 0 2px' }}>
              Find the next procurement opportunity
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Live Market Inflow Feeds & District Supply Balancing
            </p>
          </div>

          <span className="mono" style={{
            fontSize: '11px',
            fontWeight: '700',
            background: '#e8f5e9',
            color: '#15803d',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid #bbf7d0'
          }}>
            LIVE APMC FEED
          </span>
        </div>
      </div>

      {/* Cluster Grid Cards */}
      <div className="analytics-grid">
        {clusters.map((cluster) => {
          const isSurplus = cluster.type === 'surplus';
          const supplyPct = Math.min(100, Math.round((cluster.verifiedSupplyTonnes / cluster.demandTonnes) * 100));

          return (
            <div key={cluster.name} className="region-card">
              <div className="region-card-top">
                <div className="region-name">
                  <MapPin size={16} color="#475569" />
                  <span>{cluster.name}</span>
                </div>
                <div className={`status-tag ${isSurplus ? 'surplus' : 'gap'}`}>
                  {cluster.gapTonnes} t {isSurplus ? 'surplus' : 'gap'}
                </div>
              </div>

              {/* Progress track */}
              <div className="region-progress-track">
                <div 
                  className={`region-progress-fill ${isSurplus ? 'surplus' : ''}`}
                  style={{ width: `${supplyPct}%` }}
                ></div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="region-subtext">
                  Demand {cluster.demandTonnes}t · verified supply {cluster.verifiedSupplyTonnes}t
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Demand Intelligence Callout Card */}
      <div className="intelligence-callout">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="intel-tag">{intel.badge}</div>
            <h3 className="intel-title">{intel.title}</h3>
            <p className="intel-desc">
              {intel.recommendation}
            </p>
          </div>

          <div style={{ flexShrink: 0, marginLeft: '20px' }}>
            {rerouted ? (
              <div style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '8px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <CheckCircle2 size={16} />
                <span>Surplus Re-routed! (Nashik Gap down to 20t)</span>
              </div>
            ) : (
              <button 
                className="btn-primary" 
                style={{
                  background: '#c2410c',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12.5px'
                }}
                onClick={handleReroute}
              >
                <RefreshCw size={14} />
                <span>Auto Re-Route Surplus (60t)</span>
              </button>
            )}
          </div>
        </div>

        {/* Intelligence Driver bullet points */}
        <div style={{
          marginTop: '16px',
          paddingTop: '14px',
          borderTop: '1px solid #ffedd5',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          fontSize: '12px',
          color: '#7c2d12'
        }}>
          {intel.keyDrivers.map((driver, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ fontWeight: '800' }}>•</span>
              <span>{driver}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
