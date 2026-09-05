import React, { useState } from 'react';
import { 
  Users, 
  PlusCircle, 
  Smartphone, 
  CheckCircle2, 
  Phone, 
  Building2, 
  Leaf, 
  DollarSign, 
  ArrowUpRight,
  Sparkles,
  Send,
  Clock,
  MapPin,
  Tag,
  AlertCircle,
  Truck,
  Check
} from 'lucide-react';
import { MOCK_FARMERS, INITIAL_PLATFORM_INQUIRIES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function FarmerFPOView({ 
  openSmsModal,
  platformInquiries = INITIAL_PLATFORM_INQUIRIES,
  setPlatformInquiries
}) {
  const [farmers, setFarmers] = useState(MOCK_FARMERS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFarmerName, setNewFarmerName] = useState('');
  const [newVillage, setNewVillage] = useState('');
  const [newHarvestKg, setNewHarvestKg] = useState(2500);
  const [newPhone, setNewPhone] = useState('');
  const [newTechLevel, setNewTechLevel] = useState('Offline / Basic Phone (SMS)');

  // Quotation Response Form State
  const [activeQuotingInquiryId, setActiveQuotingInquiryId] = useState(null);
  const [quotePricePerKg, setQuotePricePerKg] = useState(22.50);
  const [quoteNotes, setQuoteNotes] = useState('Grade-A export stock ready at Niphad central packhouse.');

  const handleAddFarmer = (e) => {
    e.preventDefault();
    const rate = 23.80;
    const newEntry = {
      id: `F-${105 + farmers.length}`,
      name: newFarmerName,
      village: newVillage,
      crop: "Tomatoes",
      harvestKg: Number(newHarvestKg),
      phone: newPhone || "+91 98XXX-XXXXX",
      rating: 5.0,
      payoutDue: `₹${Math.round(Number(newHarvestKg) * rate).toLocaleString()}`,
      techLevel: newTechLevel
    };

    setFarmers([newEntry, ...farmers]);
    setShowAddForm(false);
    setNewFarmerName('');
    setNewVillage('');
    
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // FPO submits price quote to Admin
  const handleSubmitQuote = (inquiryId, quantityKg) => {
    if (setPlatformInquiries) {
      setPlatformInquiries(prev => prev.map(inq => {
        if (inq.id === inquiryId) {
          return {
            ...inq,
            status: "Quote Received",
            fpoQuote: {
              available: true,
              pricePerKg: Number(quotePricePerKg),
              totalAmount: Math.round(Number(quotePricePerKg) * (inq.quantityKg || 12)),
              availableStockKg: 225,
              packhouseNotes: quoteNotes || "Stock ready for inspection & dispatch.",
              quoteTimestamp: "Just now"
            }
          };
        }
        return inq;
      }));
    }

    setActiveQuotingInquiryId(null);
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    alert(`Quotation of ₹${quotePricePerKg}/kg sent to Master Admin! When you switch to the Admin Portal, Admin will be notified to approve and assign logistics.`);
  };

  const totalMemberFarmers = farmers.length * 35; // represented scaling
  const totalPooledTonnes = (farmers.reduce((acc, f) => acc + f.harvestKg, 0) / 1000).toFixed(1);

  // Filter inquiries relevant to this FPO (or show all inquiries for demo)
  const myInquiries = platformInquiries;

  return (
    <div className="farmer-fpo-view" style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e1ebe3',
        borderRadius: '12px',
        padding: '20px 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <span className="card-header-meta">FPO FIELD COMMAND · SUPPLY AGGREGATION</span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: '700' }}>
            Nashik Agri Farmer Producer Organization (FPO)
          </h2>
          <p style={{ fontSize: '13px', color: '#526b5c', marginTop: '4px' }}>
            Registered under Ministry of Corporate Affairs (CIN: U01111MH2021PTC361284) · Niphad Hub, Nashik District
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-secondary" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={openSmsModal}
          >
            <Smartphone size={15} />
            <span>Send Bulk SMS Alert</span>
          </button>

          <button 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setShowAddForm(true)}
          >
            <PlusCircle size={15} />
            <span>Register Farmer Harvest</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="kpi-card green">
          <div className="kpi-label">Active Member Farmers</div>
          <div className="kpi-value">{farmers.length * 28}</div>
          <div className="kpi-subtext">Across 6 village clusters</div>
        </div>

        <div className="kpi-card blue">
          <div className="kpi-label">Pooled Harvest Ready</div>
          <div className="kpi-value">{totalPooledTonnes} t</div>
          <div className="kpi-subtext">Grade-A Roma Tomatoes</div>
        </div>

        <div className="kpi-card amber">
          <div className="kpi-label">Guaranteed Farm-Gate Rate</div>
          <div className="kpi-value">₹23.80/kg</div>
          <div className="kpi-subtext">+₹5.80 over local mandi</div>
        </div>

        <div className="kpi-card">
          <div className="kpi-label">Escrow Payout Released</div>
          <div className="kpi-value highlight-green">₹3.72 L</div>
          <div className="kpi-subtext">Direct to farmer bank accounts</div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: INCOMING ADMIN DEMAND BROADCASTS & QUOTATION REQUESTS */}
      {/* ========================================================================= */}
      <div className="content-card" style={{ marginBottom: '24px', borderLeft: '4px solid #166534' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span className="card-header-meta" style={{ color: '#166534' }}>LIVE DEMAND BROADCAST INBOX</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '2px 0 0' }}>
              Incoming Admin Availability Inquiries & Order Quotations
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '2px 0 0' }}>
              Admin has broadcasted these demand requests to your district FPO packhouse. Check availability, set your supply price quote (₹/kg), and submit to Platform Admin for approval.
            </p>
          </div>

          <span className="mono" style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
            {myInquiries.length} Active Inquiries
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {myInquiries.map((inq) => (
            <div
              key={inq.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '16px 20px',
                background: inq.fpoQuote ? '#f8fafc' : '#ffffff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="mono" style={{ fontSize: '11px', background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                      {inq.id}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>
                      {inq.crop} · <span className="mono" style={{ color: '#0284c7' }}>{inq.quantity}</span>
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#475569', marginTop: '3px' }}>
                    <strong>Requester:</strong> {inq.requesterName} · <strong>Destination:</strong> {inq.requesterLocation}
                  </div>
                </div>

                <span className="mono" style={{
                  fontSize: '11.5px',
                  padding: '3px 10px',
                  borderRadius: '6px',
                  fontWeight: '700',
                  background: inq.status.includes('Dispatched') ? '#e0f2fe' : inq.status.includes('Quote Received') ? '#dcfce7' : '#fef3c7',
                  color: inq.status.includes('Dispatched') ? '#0369a1' : inq.status.includes('Quote Received') ? '#15803d' : '#b45309'
                }}>
                  {inq.status}
                </span>
              </div>

              {/* Special Instruction */}
              <div style={{ background: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', color: '#0369a1', marginBottom: '12px' }}>
                <strong>Admin Message:</strong> "{inq.specialInstruction}"
              </div>

              {/* FPO Quotation Section */}
              {inq.fpoQuote ? (
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '11.5px', color: '#166534', fontWeight: '700' }}>
                      ✓ YOUR SUBMITTED PRICE QUOTE:
                    </div>
                    <div className="mono" style={{ fontSize: '16px', fontWeight: '800', color: '#15803d', marginTop: '2px' }}>
                      ₹{inq.fpoQuote.pricePerKg} / kg (Total Supply Value: ₹{inq.fpoQuote.totalAmount})
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#166534', fontStyle: 'italic', marginTop: '2px' }}>
                      "{inq.fpoQuote.packhouseNotes}"
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {inq.adminApproved ? (
                      <span style={{ fontSize: '12px', color: '#15803d', fontWeight: '700' }}>
                        ✓ Quote Approved by Admin · {inq.logisticsDetails?.trackingStatus || 'Logistics Scheduled'}
                      </span>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#b45309', fontWeight: '600' }}>
                        ⏳ Awaiting Admin Approval & Logistics Mode
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                /* Set Price Form */
                <div>
                  {activeQuotingInquiryId === inq.id ? (
                    <div style={{ background: '#fafaf9', border: '1px solid #e7e5e4', borderRadius: '8px', padding: '14px', marginTop: '10px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '10px' }}>Set FPO Supply Price & Packhouse Availability:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px', marginBottom: '12px' }}>
                        <div>
                          <label className="form-label" style={{ fontSize: '11.5px' }}>Price Quote (₹ / kg)</label>
                          <input
                            type="number"
                            step="0.50"
                            className="form-input"
                            value={quotePricePerKg}
                            onChange={(e) => setQuotePricePerKg(e.target.value)}
                            required
                          />
                        </div>

                        <div>
                          <label className="form-label" style={{ fontSize: '11.5px' }}>Packhouse Availability Note</label>
                          <input
                            type="text"
                            className="form-input"
                            value={quoteNotes}
                            onChange={(e) => setQuoteNotes(e.target.value)}
                            placeholder="e.g. 100 crates available at Niphad packhouse"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button type="button" className="btn-secondary" style={{ padding: '5px 12px', fontSize: '12px' }} onClick={() => setActiveQuotingInquiryId(null)}>
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn-primary"
                          style={{ background: '#166534', padding: '5px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
                          onClick={() => handleSubmitQuote(inq.id, inq.quantityKg)}
                        >
                          <Send size={12} />
                          <span>Submit Price Quote to Admin</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        className="btn-primary"
                        style={{ background: '#166534', padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
                        onClick={() => {
                          setActiveQuotingInquiryId(inq.id);
                          setQuotePricePerKg(22.50);
                        }}
                      >
                        <Tag size={13} />
                        <span>Confirm Availability & Set Price Quote</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Farmer Modal Form */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register Member Farmer Harvest</h3>
              <button className="modal-close-btn" onClick={() => setShowAddForm(false)}>×</button>
            </div>
            <form onSubmit={handleAddFarmer}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Farmer Full Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Tukaram Gaikwad" 
                    value={newFarmerName} 
                    onChange={(e) => setNewFarmerName(e.target.value)} 
                    required 
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Village / Cluster</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. Niphad" 
                      value={newVillage} 
                      onChange={(e) => setNewVillage(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Harvest Capacity (kg)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={newHarvestKg} 
                      onChange={(e) => setNewHarvestKg(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="+91 98XXX-XXXXX" 
                      value={newPhone} 
                      onChange={(e) => setNewPhone(e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Farmer Device / Tech Access</label>
                    <select 
                      className="form-select"
                      value={newTechLevel}
                      onChange={(e) => setNewTechLevel(e.target.value)}
                    >
                      <option value="Offline / Basic Phone (SMS)">Offline / Basic Phone (SMS)</option>
                      <option value="Smartphone User">Smartphone User</option>
                      <option value="Offline / FPO Field Agent">Offline / FPO Field Agent</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save & Issue Batch QR</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Member Farmers Table */}
      <div className="content-card">
        <div className="card-header-row">
          <div>
            <span className="card-header-meta">MEMBER HARVEST ROSTER</span>
            <h3 className="card-header-title">Smallholder Supply Aggregation Table</h3>
          </div>
          <span style={{ fontSize: '12.5px', color: '#15803d', fontWeight: '600' }}>
            Direct Escrow Settlement Active
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                <th style={{ padding: '12px 14px' }}>Farmer ID</th>
                <th style={{ padding: '12px 14px' }}>Farmer Name</th>
                <th style={{ padding: '12px 14px' }}>Village Hub</th>
                <th style={{ padding: '12px 14px' }}>Harvest Ready</th>
                <th style={{ padding: '12px 14px' }}>Technology Level</th>
                <th style={{ padding: '12px 14px' }}>Direct Bank Payout</th>
                <th style={{ padding: '12px 14px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px' }} className="mono">{farmer.id}</td>
                  <td style={{ padding: '12px 14px', fontWeight: '700', color: '#14281d' }}>{farmer.name}</td>
                  <td style={{ padding: '12px 14px', color: '#475569' }}>{farmer.village}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="mono" style={{ fontWeight: '700' }}>{farmer.harvestKg.toLocaleString()} kg</span>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>({(farmer.harvestKg / 1000).toFixed(1)} t)</span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span className="mono" style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: farmer.techLevel.includes('Offline') ? '#fffbeb' : '#f0fdf4',
                      color: farmer.techLevel.includes('Offline') ? '#b45309' : '#15803d'
                    }}>
                      {farmer.techLevel}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }} className="mono">
                    <strong style={{ color: '#15803d' }}>{farmer.payoutDue}</strong>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button 
                      style={{
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '11.5px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => openSmsModal({ name: farmer.name, phone: farmer.phone, crop: farmer.crop })}
                    >
                      <Smartphone size={12} />
                      <span>SMS Alert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
