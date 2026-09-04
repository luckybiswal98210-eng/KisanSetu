import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PostDemandModal({ isOpen, onClose, onSaveDemand, currentDemand }) {
  if (!isOpen) return null;

  const [crop, setCrop] = useState(currentDemand?.crop || "Grade-A Tomatoes");
  const [quantity, setQuantity] = useState(currentDemand?.targetQuantity || 100);
  const [maxPrice, setMaxPrice] = useState(currentDemand?.targetPricePerKg || 25);
  const [location, setLocation] = useState("Nashik, Maharashtra");
  const [deliveryDays, setDeliveryDays] = useState(10);
  const [buyerName, setBuyerName] = useState(currentDemand?.buyerName || "FreshFoods Pvt. Ltd.");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentDemand,
      crop,
      targetQuantity: Number(quantity),
      targetPricePerKg: Number(maxPrice),
      location,
      deliveryWindowDays: Number(deliveryDays),
      buyerName,
      status: "Matching",
      verifiedSupply: Math.round(Number(quantity) * 0.72 * 10) / 10,
      currentGap: Math.round(Number(quantity) * 0.28 * 10) / 10
    };

    onSaveDemand(updated);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="card-header-meta">PROCUREMENT OS · DEMAND BROADCAST</span>
            <h3>Post New Bulk Agri-Demand</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Buyer Organization</label>
              <input 
                type="text" 
                className="form-input" 
                value={buyerName} 
                onChange={(e) => setBuyerName(e.target.value)} 
                required 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Crop & Grade</label>
                <select 
                  className="form-select" 
                  value={crop} 
                  onChange={(e) => setCrop(e.target.value)}
                >
                  <option value="Grade-A Tomatoes">Grade-A Tomatoes</option>
                  <option value="Grade-A Nashik Red Onions">Grade-A Nashik Red Onions</option>
                  <option value="Process-Grade Potatoes">Process-Grade Potatoes</option>
                  <option value="Organic Sweet Corn">Organic Sweet Corn</option>
                  <option value="Export-Grade Green Grapes">Export-Grade Green Grapes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Target Volume (Tonnes)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)} 
                  min="5" 
                  max="1000" 
                  required 
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Max Procurement Price (₹ / kg)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(e.target.value)} 
                  min="5" 
                  max="200" 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Delivery Window (Days)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={deliveryDays} 
                  onChange={(e) => setDeliveryDays(e.target.value)} 
                  min="1" 
                  max="30" 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Target Sourcing Region</label>
              <input 
                type="text" 
                className="form-input" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                required 
              />
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '12px 14px',
              fontSize: '12.5px',
              color: '#166534',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Sparkles size={18} style={{ flexShrink: 0, color: '#15803d' }} />
              <span>
                <strong>AI Auto-Broadcast:</strong> Upon posting, regional FPOs within 150 km will receive automated WhatsApp & SMS alerts with verified harvest collection windows.
              </span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span>Broadcast Demand</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
