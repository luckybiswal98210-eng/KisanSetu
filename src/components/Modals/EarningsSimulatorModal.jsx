import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function EarningsSimulatorModal({ isOpen, onClose, defaultRate = 27.00 }) {
  if (!isOpen) return null;

  const [consumerPrice, setConsumerPrice] = useState(defaultRate);
  const [volumeKg, setVolumeKg] = useState(10000); // 10,000 kg sample (from prompt)
  
  // Traditional route calculations
  const traditionalFarmerRate = Math.round(consumerPrice * 0.66 * 100) / 100; // ~66% (e.g. ₹18 when price is ₹27)
  const traditionalMiddlemenFee = Math.round((consumerPrice - traditionalFarmerRate) * 100) / 100; // ~₹9.00
  const traditionalFarmerTotal = Math.round(traditionalFarmerRate * volumeKg);

  // KisanSetu Direct route calculations
  const platformLogisticsFee = 3.20;
  const platformFarmerRate = Math.round((consumerPrice - platformLogisticsFee) * 100) / 100; // e.g. ₹23.80
  const platformFarmerTotal = Math.round(platformFarmerRate * volumeKg);
  
  const additionalFarmerProfit = platformFarmerTotal - traditionalFarmerTotal;
  const improvementPerKg = Math.round((platformFarmerRate - traditionalFarmerRate) * 100) / 100;
  const percentageBoost = Math.round((improvementPerKg / traditionalFarmerRate) * 100);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="card-header-meta">ECONOMIC IMPACT SIMULATOR</span>
            <h3>Farmer Realization & Margin Analyzer</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ fontSize: '13px', color: '#475569', marginBottom: '20px' }}>
            Simulate how cutting out 4–6 layers of intermediaries (village agents, commission brokers, loading handlers, APMC cess) increases net farmer realization.
          </p>

          {/* Interactive Sliders */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', marginBottom: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>End Buyer / Market Price (₹ / kg)</label>
                <span className="mono" style={{ fontWeight: '700', color: '#0d2f1b' }}>₹{consumerPrice.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="60" 
                step="0.5" 
                value={consumerPrice} 
                onChange={(e) => setConsumerPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#15803d' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Order Batch Quantity (kg)</label>
                <span className="mono" style={{ fontWeight: '700', color: '#0d2f1b' }}>{volumeKg.toLocaleString()} kg ({volumeKg / 1000} tonnes)</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="50000" 
                step="1000" 
                value={volumeKg} 
                onChange={(e) => setVolumeKg(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#15803d' }}
              />
            </div>
          </div>

          {/* Comparison Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            {/* Traditional Channel */}
            <div style={{ border: '1px solid #fed7aa', borderRadius: '10px', padding: '16px', background: '#fffbeb' }}>
              <span className="mono" style={{ fontSize: '11px', fontWeight: '700', color: '#b45309' }}>TRADITIONAL APMC MANDI</span>
              <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#78350f', margin: '8px 0 4px' }}>
                ₹{traditionalFarmerRate.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: '500' }}>/ kg</span>
              </h4>
              <p style={{ fontSize: '11.5px', color: '#92400e', marginBottom: '12px' }}>
                Intermediary cut: ₹{traditionalMiddlemenFee.toFixed(2)}/kg (~34%)
              </p>
              <div style={{ borderTop: '1px solid #fde68a', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: '#78350f' }}>Total Farmer Batch Earnings:</span>
                <div className="mono" style={{ fontSize: '16px', fontWeight: '700', color: '#78350f' }}>
                  ₹{traditionalFarmerTotal.toLocaleString()}
                </div>
              </div>
            </div>

            {/* KisanSetu Direct */}
            <div style={{ border: '1.5px solid #86efac', borderRadius: '10px', padding: '16px', background: '#f0fdf4' }}>
              <span className="mono" style={{ fontSize: '11px', fontWeight: '700', color: '#15803d' }}>KISANSETU DIRECT OS</span>
              <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#14532d', margin: '8px 0 4px' }}>
                ₹{platformFarmerRate.toFixed(2)} <span style={{ fontSize: '12px', fontWeight: '500' }}>/ kg</span>
              </h4>
              <p style={{ fontSize: '11.5px', color: '#166534', marginBottom: '12px' }}>
                Collection + cold freight: ₹{platformLogisticsFee.toFixed(2)}/kg
              </p>
              <div style={{ borderTop: '1px solid #bbf7d0', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: '#14532d' }}>Total Farmer Batch Earnings:</span>
                <div className="mono" style={{ fontSize: '16px', fontWeight: '700', color: '#166534' }}>
                  ₹{platformFarmerTotal.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Gain Highlight Banner */}
          <div style={{
            background: '#0d2f1b',
            color: '#ffffff',
            borderRadius: '10px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#86efac', fontWeight: '700', letterSpacing: '0.5px' }}>
                NET FARMER EARNINGS SURGE
              </div>
              <div style={{ fontSize: '20px', fontWeight: '800' }}>
                +₹{additionalFarmerProfit.toLocaleString()} Extra Profit ({percentageBoost}% Increase)
              </div>
            </div>
            <div className="mono" style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '700', color: '#4ade80' }}>
              +₹{improvementPerKg.toFixed(2)} / kg
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-primary" onClick={onClose}>
            Done & Return to Control Room
          </button>
        </div>
      </div>
    </div>
  );
}
