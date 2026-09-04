import React, { useState } from 'react';
import { 
  User, 
  Leaf, 
  TrendingUp, 
  DollarSign, 
  Smartphone, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles,
  MapPin,
  Calendar,
  Building2,
  Clock,
  Send,
  Truck,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_PLATFORM_INQUIRIES } from '../../data/mockData';

export default function FarmerDirectDashboard({ 
  currentUser, 
  openSmsModal,
  platformInquiries = INITIAL_PLATFORM_INQUIRIES,
  setPlatformInquiries
}) {
  const [batches, setBatches] = useState([
    {
      id: "BATCH-TOM-01",
      crop: "Grade-A Roma Tomatoes",
      harvestKg: 4500,
      ratePerKg: 23.80,
      traditionalMandiRate: 18.00,
      status: "Harvest Verified & Dispatched",
      totalPayout: 107100,
      fpoPartner: "Nashik Agri FPO Co-op",
      harvestDate: "Aug 30, 2026",
      payoutStatus: "Credited via Direct Bank Transfer (NEFT/UPI)"
    },
    {
      id: "BATCH-ON-02",
      crop: "Nashik Red Onions (55mm)",
      harvestKg: 3200,
      ratePerKg: 32.00,
      traditionalMandiRate: 24.50,
      status: "Growing / Ready in 12 Days",
      totalPayout: 102400,
      fpoPartner: "Nashik Agri FPO Co-op",
      harvestDate: "Sep 12, 2026",
      payoutStatus: "Forward Contract Locked in Escrow"
    }
  ]);

  const [showAddBatch, setShowAddBatch] = useState(false);
  const [crop, setCrop] = useState("Tomatoes");
  const [kg, setKg] = useState(3000);
  const [harvestDays, setHarvestDays] = useState(7);

  // Direct farmer quotation state
  const [activeQuotingInquiryId, setActiveQuotingInquiryId] = useState(null);
  const [farmerQuoteRate, setFarmerQuoteRate] = useState(21.50);
  const [farmerQuoteNotes, setFarmerQuoteNotes] = useState('Fresh morning harvest ready at farm gate in Niphad.');

  const handleAddHarvest = (e) => {
    e.preventDefault();
    const rate = crop === 'Tomatoes' ? 23.80 : 32.00;
    const newBatch = {
      id: `BATCH-CUSTOM-${Date.now().toString().slice(-4)}`,
      crop: `Grade-A ${crop}`,
      harvestKg: Number(kg),
      ratePerKg: rate,
      traditionalMandiRate: rate * 0.75,
      status: "Listed on KisanSetu & Pooled into FPO",
      totalPayout: Math.round(Number(kg) * rate),
      fpoPartner: "Nashik Agri FPO Co-op",
      harvestDate: `In ${harvestDays} days`,
      payoutStatus: "Escrow Reserved"
    };

    setBatches([newBatch, ...batches]);
    setShowAddBatch(false);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
  };

  const handleFarmerSubmitQuote = (inquiryId) => {
    if (setPlatformInquiries) {
      setPlatformInquiries(prev => prev.map(inq => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            status: "Quote Received",
            fpoQuote: {
              available: true,
              pricePerKg: Number(farmerQuoteRate),
              totalAmount: Math.round(Number(farmerQuoteRate) * (inq.quantityKg || 12)),
              availableStockKg: inq.quantityKg || 50,
              packhouseNotes: farmerQuoteNotes || "Farm gate harvest ready for pickup.",
              quoteTimestamp: "Just now (Direct Farmer Response)"
            }
          };
        }
        return inq;
      }));
    }
    setActiveQuotingInquiryId(null);
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    alert(`Quotation of ₹${farmerQuoteRate}/kg submitted to Admin! Master Admin will review, approve, and arrange logistics.`);
  };

  const totalEarnings = batches.reduce((sum, b) => sum + b.totalPayout, 0);
  const totalVolumeKg = batches.reduce((sum, b) => sum + b.harvestKg, 0);
  const totalGainOverMandi = batches.reduce((sum, b) => sum + (b.harvestKg * (b.ratePerKg - b.traditionalMandiRate)), 0);

  return (
    <div className="farmer-direct-view">
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
        borderRadius: '12px',
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(180, 83, 9, 0.15)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '8px' }}>
            <User size={14} />
            <span>INDIVIDUAL FARMER DIRECT PORTAL</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '700', margin: '2px 0 6px' }}>
            {currentUser?.name || "Balasaheb Jadhav"} (Niphad, Nashik)
          </h2>
          <p style={{ fontSize: '13px', color: '#fef3c7' }}>
            Land: 4.5 Acres · Connected to <strong>Nashik Agri FPO</strong> · Direct Escrow Settlement Active
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary" 
            style={{ background: 'rgba(255,255,255,0.9)', color: '#78350f', border: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={openSmsModal}
          >
            <Smartphone size={15} />
            <span>SMS Alerts Setup</span>
          </button>

          <button 
            className="btn-primary" 
            style={{ background: '#0d2f1b', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setShowAddBatch(true)}
          >
            <PlusCircle size={15} />
            <span>List Harvest Batch</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stats */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card green">
          <div className="kpi-label">Total Verified Harvest</div>
          <div className="kpi-value">{totalVolumeKg.toLocaleString()} kg</div>
          <div className="kpi-subtext">{(totalVolumeKg / 1000).toFixed(1)} tonnes pooled</div>
        </div>

        <div className="kpi-card blue">
          <div className="kpi-label">Guaranteed Farm-Gate Rate</div>
          <div className="kpi-value">₹23.80/kg</div>
          <div className="kpi-subtext">Direct to bank account</div>
        </div>

        <div className="kpi-card amber">
          <div className="kpi-label">Extra Profit vs Mandi Dalals</div>
          <div className="kpi-value highlight-green">+₹{totalGainOverMandi.toLocaleString()}</div>
          <div className="kpi-subtext">+32% income gain</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Total Realized Payout</div>
          <div className="kpi-value" style={{ color: '#166534' }}>₹{totalEarnings.toLocaleString()}</div>
          <div className="kpi-subtext">Direct UPI / NEFT release</div>
        </div>
      </div>

      {/* 5. Live Admin Availability Inquiries & Direct Quotation Feed */}
      <div className="content-card" style={{ marginBottom: '24px', border: '2px solid #bbf7d0', background: '#f0fdf4' }}>
        <div className="card-header-row">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
              <Sparkles size={13} />
              <span>LIVE ADMIN AVAILABILITY INQUIRIES & DEMAND NOTIFICATIONS</span>
            </div>
            <h3 className="card-header-title" style={{ color: '#064e3b' }}>
              Direct Harvest Demand Inquiries (Nashik / Maharashtra)
            </h3>
          </div>
          <span style={{ fontSize: '12px', background: '#166534', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontWeight: '700' }}>
            {platformInquiries.length} Active Platform Inquiries
          </span>
        </div>

        <p style={{ fontSize: '13px', color: '#166534', marginBottom: '16px' }}>
          When the Master Admin or Corporate Bulk Buyers need produce in your district, an availability inquiry is broadcasted here. Confirm your ready crop quantity, enter your expected farm-gate price (₹/kg), and submit your quotation directly.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {platformInquiries.map((inq) => {
            const isQuotingThis = activeQuotingInquiryId === inq.id;
            const hasQuote = inq.fpoQuote && inq.fpoQuote.pricePerKg;
            const isApproved = inq.status === 'Quote Approved & Dispatched';

            return (
              <div 
                key={inq.id}
                style={{
                  background: '#ffffff',
                  border: isApproved ? '2px solid #16a34a' : hasQuote ? '1.5px solid #3b82f6' : '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '16px 20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ flex: '1 1 300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span className="mono" style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontWeight: '700', color: '#0f172a' }}>
                        {inq.id}
                      </span>
                      <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                        {inq.produceName} · {inq.quantityFormatted}
                      </h4>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: isApproved ? '#dcfce7' : hasQuote ? '#dbeafe' : '#fef3c7',
                        color: isApproved ? '#166534' : hasQuote ? '#1e40af' : '#92400e'
                      }}>
                        {inq.status}
                      </span>
                    </div>

                    <div style={{ fontSize: '12.5px', color: '#475569', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
                      <span><strong>Requested by:</strong> {inq.buyerName} ({inq.buyerType})</span>
                      <span>·</span>
                      <span><strong>Target Location:</strong> {inq.targetState} &gt; {inq.targetDistrict}</span>
                      <span>·</span>
                      <span className="mono">Time: {inq.timestamp}</span>
                    </div>

                    <p style={{ fontSize: '12.5px', color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: '6px', margin: '10px 0 6px', borderLeft: '3px solid #16a34a' }}>
                      <em>"{inq.inquiryMessage}"</em>
                    </p>

                    {/* If quote already provided */}
                    {hasQuote && (
                      <div style={{ marginTop: '10px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '10px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '12.5px', fontWeight: '700', color: '#166534' }}>
                            Your Submitted Farm Quote: ₹{inq.fpoQuote.pricePerKg}/kg
                          </span>
                          <span className="mono" style={{ fontSize: '12.5px', fontWeight: '800', color: '#166534' }}>
                            Total: ₹{inq.fpoQuote.totalAmount?.toLocaleString()}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#15803d', marginTop: '2px' }}>
                          Notes: {inq.fpoQuote.packhouseNotes} ({inq.fpoQuote.quoteTimestamp})
                        </div>
                      </div>
                    )}

                    {/* Logistics Confirmation after Admin Approval */}
                    {inq.logistics && (
                      <div style={{ marginTop: '10px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Truck size={18} color="#2563eb" />
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#1e40af' }}>
                            Admin Assigned Logistics: {inq.logistics.provider}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#3b82f6' }}>
                            Tracking ID: {inq.logistics.trackingId} · Estimated Pickup: {inq.logistics.estDelivery} · Status: {inq.logistics.dispatchStatus}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '160px', alignItems: 'flex-end' }}>
                    {!hasQuote && !isQuotingThis && (
                      <button 
                        className="btn-primary"
                        style={{ background: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 14px' }}
                        onClick={() => setActiveQuotingInquiryId(inq.id)}
                      >
                        <DollarSign size={15} />
                        <span>Submit Farm Quote</span>
                      </button>
                    )}

                    {isApproved && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#166534', fontWeight: '700', fontSize: '12.5px', background: '#dcfce7', padding: '6px 10px', borderRadius: '6px' }}>
                        <CheckCircle2 size={16} />
                        <span>Order Dispatched</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Inline Quotation Form */}
                {isQuotingThis && (
                  <div style={{ marginTop: '16px', background: '#f8fafc', border: '1.5px solid #93c5fd', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                      <AlertCircle size={16} color="#2563eb" />
                      <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>
                        Submit Your Farm-Gate Price Quote to Admin
                      </h5>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '14px' }}>
                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          Your Farm Price (₹ per kg)
                        </label>
                        <input 
                          type="number" 
                          step="0.5" 
                          value={farmerQuoteRate}
                          onChange={(e) => setFarmerQuoteRate(e.target.value)}
                          className="form-input" 
                          style={{ fontWeight: '700', fontSize: '15px' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          Calculated Total Amount
                        </label>
                        <div style={{ height: '40px', display: 'flex', alignItems: 'center', padding: '0 12px', background: '#e2e8f0', borderRadius: '6px', fontWeight: '800', color: '#0f172a' }}>
                          ₹{Math.round(Number(farmerQuoteRate) * (inq.quantityKg || 12)).toLocaleString()}
                        </div>
                      </div>

                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>
                          Harvest Readiness & Location Notes
                        </label>
                        <input 
                          type="text" 
                          value={farmerQuoteNotes}
                          onChange={(e) => setFarmerQuoteNotes(e.target.value)}
                          className="form-input" 
                          placeholder="e.g. Fresh morning harvest ready at Niphad farm gate"
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                      <button 
                        type="button" 
                        className="btn-secondary" 
                        style={{ fontSize: '12.5px', padding: '6px 12px' }}
                        onClick={() => setActiveQuotingInquiryId(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="button" 
                        className="btn-primary" 
                        style={{ background: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', padding: '6px 16px' }}
                        onClick={() => handleFarmerSubmitQuote(inq.id)}
                      >
                        <Send size={14} />
                        <span>Send Quote to Admin</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Harvest Batches Table */}
      <div className="content-card">
        <div className="card-header-row">
          <div>
            <span className="card-header-meta">HARVEST & ESCROW LOG</span>
            <h3 className="card-header-title">My Registered Harvest Batches</h3>
          </div>
          <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '700' }}>
            100% Escrow Protected
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {batches.map((batch) => (
            <div 
              key={batch.id}
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="mono" style={{ fontSize: '11px', background: '#e2e8f0', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                    {batch.id}
                  </span>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{batch.crop}</h4>
                  <span className="mono" style={{ fontSize: '10.5px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                    {batch.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  FPO: {batch.fpoPartner} · Date: {batch.harvestDate} · {batch.payoutStatus}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="mono" style={{ fontSize: '18px', fontWeight: '800', color: '#166534' }}>
                  ₹{batch.totalPayout.toLocaleString()}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                  {batch.harvestKg.toLocaleString()} kg @ ₹{batch.ratePerKg}/kg (vs ₹{batch.traditionalMandiRate}/kg mandi)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Batch Modal */}
      {showAddBatch && (
        <div className="modal-overlay" onClick={() => setShowAddBatch(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>List New Harvest Batch</h3>
              <button className="modal-close-btn" onClick={() => setShowAddBatch(false)}>×</button>
            </div>
            <form onSubmit={handleAddHarvest}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Crop Name</label>
                  <select className="form-select" value={crop} onChange={(e) => setCrop(e.target.value)}>
                    <option value="Tomatoes">Grade-A Tomatoes</option>
                    <option value="Onions">Nashik Red Onions</option>
                    <option value="Potatoes">Process-Grade Potatoes</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Harvest Quantity (kg)</label>
                  <input type="number" className="form-input" value={kg} onChange={(e) => setKg(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label className="form-label">Harvest Readiness (Days)</label>
                  <input type="number" className="form-input" value={harvestDays} onChange={(e) => setHarvestDays(e.target.value)} required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddBatch(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Confirm & Pool with FPO</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
