import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Navigation, 
  CheckCircle2, 
  QrCode, 
  AlertTriangle,
  Sparkles,
  Phone,
  ArrowRight,
  TrendingDown
} from 'lucide-react';
import { LOGISTICS_MODELS } from '../../data/mockData';

export default function LogisticsView({ onSelectModel }) {
  const [selectedModelId, setSelectedModelId] = useState('model_c');
  const [activeStep, setActiveStep] = useState(2); // In transit

  const selectedModel = LOGISTICS_MODELS.find(m => m.id === selectedModelId) || LOGISTICS_MODELS[2];

  return (
    <div className="logistics-view">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <span className="card-header-meta">SUPPLY CHAIN & DISPATCH INFRASTRUCTURE</span>
        <h2 className="page-title" style={{ fontSize: '24px', margin: '4px 0 2px' }}>
          3-Tier Logistics & Route Management
        </h2>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Choose between Seller-managed, Buyer-managed, or KisanSetu Smart 3PL with AI multi-stop routing.
        </p>
      </div>

      {/* Model Selection Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {LOGISTICS_MODELS.map((model) => {
          const isSelected = selectedModelId === model.id;
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              style={{
                background: '#ffffff',
                border: isSelected ? '2px solid #15803d' : '1px solid #e1ebe3',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 14px rgba(21, 128, 61, 0.1)' : '0 1px 3px rgba(0,0,0,0.02)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span className="mono" style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: isSelected ? '#e8f5e9' : '#f1f5f9',
                  color: isSelected ? '#166534' : '#475569'
                }}>
                  {model.badge}
                </span>
                {isSelected && <CheckCircle2 size={18} color="#15803d" />}
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#14281d', marginBottom: '6px' }}>
                {model.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4', marginBottom: '14px' }}>
                {model.desc}
              </p>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px' }}>
                <span style={{ color: '#64748b' }}>Cost Estimate:</span>
                <span className="mono" style={{ fontWeight: '700', color: '#0d2f1b' }}>{model.costEst}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic Model Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.9fr', gap: '24px' }}>
        {/* Left Column: Interactive Map & Live Transit Visualizer */}
        <div className="content-card">
          <div className="card-header-row">
            <div>
              <span className="card-header-meta">LIVE TELEMATICS & ROUTE ENGINE</span>
              <h3 className="card-header-title">
                {selectedModelId === 'model_c' ? 'AI Optimized Multi-Stop Aggregation' : 'Single Transit Corridor'}
              </h3>
            </div>
            <span className="mono" style={{ fontSize: '11px', color: '#15803d', fontWeight: '700' }}>
              GPS LIVE (10s refresh)
            </span>
          </div>

          {/* Interactive SVG Visual Route Map */}
          <div style={{
            background: 'linear-gradient(to bottom, #0f172a, #1e293b)',
            borderRadius: '10px',
            padding: '24px',
            color: '#ffffff',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '280px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            {/* Background Grid Map Pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.15,
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              pointerEvents: 'none'
            }}></div>

            {/* Route Map Flow */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', animation: 'pulse-dot 2s infinite' }}></div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#86efac' }}>
                    Active Vehicle: MH-15-EG-4920 (Reefer 14T)
                  </span>
                </div>
                <span className="mono" style={{ fontSize: '11px', color: '#94a3b8' }}>
                  Speed: 58 km/h | ETA: 2h 15m
                </span>
              </div>

              {/* Waypoint Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
                {/* Node 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    A
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>Farm Cluster 1: Dindori Packhouse (32 Farmers)</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>8.2 tonnes loaded · 06:30 AM (Completed)</div>
                  </div>
                </div>

                {/* Node 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    B
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600' }}>Niphad Collection Hub (Weighbridge & Pre-cooling)</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>35.0 tonnes consolidated · 09:15 AM (Completed)</div>
                  </div>
                </div>

                {/* Node 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    C
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#60a5fa' }}>Current Location: Igatpuri Expressway Toll</div>
                    <div style={{ fontSize: '11px', color: '#93c5fd' }}>On-schedule · Temperature 11.4°C constant</div>
                  </div>
                </div>

                {/* Node 4 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>
                    D
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>Destination: FreshFoods Central DC (Bhiwandi, Mumbai)</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>Expected arrival: 06:30 PM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Route Saving Pill */}
            {selectedModelId === 'model_c' && (
              <div style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#86efac',
                zIndex: 2
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} />
                  <span>AI Route Clustering reduced total transit distance by <strong>42 km (22% fuel saving)</strong>.</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Model Operation Rules & Action Panel */}
        <div className="content-card">
          <span className="card-header-meta">DISPATCH WORKFLOW</span>
          <h3 className="card-header-title" style={{ marginBottom: '14px' }}>
            {selectedModel.name.split(':')[0]} Specifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            {selectedModel.pros.map((pro, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: '#334155' }}>
                <CheckCircle2 size={16} color="#15803d" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{pro}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px',
            marginBottom: '20px',
            fontSize: '12.5px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#64748b' }}>Verification Mode:</span>
              <span className="mono" style={{ fontWeight: '700', color: '#0d2f1b' }}>{selectedModel.trackingMode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Transit Guarantee:</span>
              <span className="mono" style={{ fontWeight: '700', color: '#15803d' }}>{selectedModel.transitTime}</span>
            </div>
          </div>

          {selectedModelId === 'model_b' ? (
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => alert("Digital QR Gate Pass generated for Buyer's Truck (MH-04-AB-1234).")}
            >
              <QrCode size={16} />
              <span>Generate Buyer Pickup QR Pass</span>
            </button>
          ) : (
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={() => alert(`3PL Reefer Fleet dispatched under ${selectedModel.name}. Driver Santosh Yadav assigned.`)}
            >
              <Truck size={16} />
              <span>Dispatch & Initiate Live Tracking</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
