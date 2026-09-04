import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Leaf, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Plus,
  Minus,
  ArrowRight,
  ClipboardList,
  Clock,
  Truck,
  Send,
  Info,
  Calendar,
  Package
} from 'lucide-react';
import { CONSUMER_CATALOG, INITIAL_CONSUMER_REQUESTS, GOVERNMENT_BENCHMARK_PRICES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function ConsumerStorefront({ consumerRequests = INITIAL_CONSUMER_REQUESTS, onAddConsumerRequest }) {
  const [activeView, setActiveView] = useState('catalog'); // 'catalog' or 'my_requests'
  const [cart, setCart] = useState({});
  const [consumerName, setConsumerName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 97654-32100');
  const [address, setAddress] = useState('Flat 402, Green Meadows Apt, Veera Desai Road, Andheri West, Mumbai - 400053');
  const [specialRequest, setSpecialRequest] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(null);
  const [localRequests, setLocalRequests] = useState(consumerRequests);

  const addToCart = (id) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[id] > 1) updated[id] -= 1;
      else delete updated[id];
      return updated;
    });
  };

  const totalCrates = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalKg = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = CONSUMER_CATALOG.find(c => c.id === id);
    return sum + (item ? item.crateWeightKg * qty : 0);
  }, 0);

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    if (totalCrates === 0) return;

    const requestedItems = Object.entries(cart).map(([id, qty]) => {
      const item = CONSUMER_CATALOG.find(c => c.id === id);
      return {
        id: item.id,
        name: item.name,
        quantityCrates: qty,
        totalKg: item.crateWeightKg * qty
      };
    });

    const newRequest = {
      id: `REQ-C0${localRequests.length + 1}`,
      consumerId: `CONS-0${localRequests.length + 1}`,
      consumerName: consumerName.trim() || 'Priya Sharma',
      phone: phone.trim() || '+91 98XXX-XXXXX',
      city: address.includes('Mumbai') ? 'Mumbai' : 'Pune',
      address: address.trim(),
      items: requestedItems,
      totalCrates: totalCrates,
      totalKg: totalKg,
      specialRequest: specialRequest.trim() || 'Standard farm-fresh delivery requested.',
      status: 'Pending Admin Approval',
      timestamp: 'Just now',
      assignedFPO: 'Nashik Agri FPO (Niphad Hub)'
    };

    setLocalRequests([newRequest, ...localRequests]);
    if (onAddConsumerRequest) {
      onAddConsumerRequest(newRequest);
    }

    setRequestSubmitted(newRequest);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });

    setCart({});
    setSpecialRequest('');
  };

  return (
    <div className="consumer-storefront-view" style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
        borderRadius: '12px',
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(2, 132, 199, 0.15)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '8px' }}>
            <Leaf size={14} />
            <span>DIRECT FARM PRODUCE REQUEST PORTAL</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '700', margin: '2px 0 6px' }}>
            Request Farm-Fresh Harvests Directly From Verified FPOs
          </h2>
          <p style={{ fontSize: '13px', color: '#e0f2fe' }}>
            Browse available farm produce stock, specify your required quantity, and submit your request directly to Platform Admin for fulfillment.
          </p>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.2)',
          padding: '12px 18px',
          borderRadius: '8px',
          textAlign: 'right',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          <div style={{ fontSize: '11px', color: '#bae6fd' }}>REQUESTED VOLUME</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>
            {totalCrates} Crates ({totalKg} kg)
          </div>
          <div style={{ fontSize: '11px', color: '#7dd3fc' }}>
            {Object.keys(cart).length} Produce Types Selected
          </div>
        </div>
      </div>

      {/* Navigation View Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        padding: '8px 12px',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`persona-pill-btn ${activeView === 'catalog' ? 'active' : ''}`}
            onClick={() => { setActiveView('catalog'); setRequestSubmitted(null); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Package size={15} />
            <span>Available Farm Produce ({CONSUMER_CATALOG.length})</span>
          </button>
          <button
            className={`persona-pill-btn ${activeView === 'my_requests' ? 'active' : ''}`}
            onClick={() => { setActiveView('my_requests'); setRequestSubmitted(null); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ClipboardList size={15} />
            <span>My Produce Requests & Status ({localRequests.length})</span>
          </button>
        </div>

        <span className="mono" style={{ fontSize: '11.5px', color: '#0369a1', fontWeight: '700' }}>
          Direct FPO Sourcing · Quality Guaranteed
        </span>
      </div>

      {/* Success Notification Alert */}
      {requestSubmitted && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '10px',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <CheckCircle2 size={22} color="#15803d" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#14532d', margin: '0 0 4px' }}>
                Produce Request #{requestSubmitted.id} Submitted to Platform Admin!
              </h4>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0, lineHeight: '1.4' }}>
                Your request for <strong>{requestSubmitted.totalCrates} crates ({requestSubmitted.totalKg} kg)</strong> has been broadcasted to the Admin Command Hub. The Platform Admin is assigning the verified aggregation hub (<strong>{requestSubmitted.assignedFPO}</strong>) for harvest packing and direct doorstep delivery.
              </p>
            </div>
          </div>
          <button
            className="btn-primary"
            style={{ background: '#166534', padding: '6px 12px', fontSize: '12px', flexShrink: 0 }}
            onClick={() => { setActiveView('my_requests'); setRequestSubmitted(null); }}
          >
            View Status
          </button>
        </div>
      )}

      {/* VIEW 1: Available Produce Catalog & Quantity Request Form */}
      {activeView === 'catalog' && (
        <div>
          {/* Two-Tier Routing Protocol Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            border: '1px solid #86efac',
            borderRadius: '10px',
            padding: '14px 18px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#166534', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#14532d' }}>
                  2-Tier Direct Routing Protocol: 1st Preference Smallholder Farmers ➔ 2nd Preference FPO Packhouses
                </div>
                <div style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
                  Retail consumer basket sizes (1 crate / 1–25 kg) are directly routed to individual smallholder growers for maximum farm-gate income. Aggregated volumes route to regional FPO packhouse cold-storage.
                </div>
              </div>
            </div>
            <span className="mono" style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontWeight: '700', flexShrink: 0 }}>
              Govt MSP Aligned
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.85fr', gap: '24px' }}>
          
          {/* Left Column: Product Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {CONSUMER_CATALOG.map((item) => {
              const qty = cart[item.id] || 0;
              const matchingBenchmark = GOVERNMENT_BENCHMARK_PRICES.find(b => 
                item.name.toLowerCase().includes(b.crop.toLowerCase()) || 
                b.crop.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])
              );

              return (
                <div 
                  key={item.id}
                  style={{
                    background: '#ffffff',
                    border: qty > 0 ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <span style={{ fontSize: '32px' }}>{item.imageEmoji}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                        <span className="mono" style={{
                          fontSize: '10px',
                          background: '#e0f2fe',
                          color: '#0369a1',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: '700'
                        }}>
                          {item.grade}
                        </span>
                        <span style={{
                          fontSize: '9.5px',
                          background: '#fef3c7',
                          color: '#92400e',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontWeight: '700'
                        }}>
                          1st Pref: Smallholder
                        </span>
                      </div>
                    </div>

                    <h4 style={{ fontSize: '15.5px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                      {item.name}
                    </h4>

                    {/* Government MSP / Fair Benchmark Badge */}
                    {matchingBenchmark && (
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        padding: '3px 7px',
                        borderRadius: '4px',
                        fontSize: '10.5px',
                        color: '#15803d',
                        fontWeight: '700',
                        marginBottom: '6px'
                      }}>
                        <span>🏛️ Govt Fair Benchmark: ₹{matchingBenchmark.mspBenchmarkRate}/kg</span>
                      </div>
                    )}

                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {item.fpoSource}
                    </div>

                    <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px' }}>
                      Farmer: <strong>{item.farmerName}</strong> · {item.harvestTime}
                    </div>

                    <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4', marginBottom: '12px' }}>
                      {item.specifications}
                    </p>

                    {/* Stock & Crate Info Box */}
                    <div style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                        <span style={{ color: '#64748b' }}>Crate Size:</span>
                        <strong style={{ color: '#0f172a' }}>{item.crateWeightKg} kg / crate</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span style={{ color: '#64748b' }}>Hub Available Stock:</span>
                        <span className="mono" style={{ color: '#15803d', fontWeight: '700' }}>
                          {item.inStockCrates} Crates ({item.totalAvailableKg} kg)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  {qty === 0 ? (
                    <button
                      className="btn-primary"
                      style={{
                        background: '#0284c7',
                        width: '100%',
                        padding: '8px',
                        fontSize: '12.5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                      onClick={() => addToCart(item.id)}
                    >
                      <Plus size={14} />
                      <span>Select Quantity</span>
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f0f9ff', borderRadius: '8px', padding: '4px 8px' }}>
                      <button 
                        style={{ width: '28px', height: '28px', border: 'none', background: '#ffffff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Minus size={14} color="#0284c7" />
                      </button>
                      <span className="mono" style={{ fontWeight: '700', color: '#0369a1', fontSize: '13px' }}>
                        {qty} Crates ({qty * item.crateWeightKg} kg)
                      </span>
                      <button 
                        style={{ width: '28px', height: '28px', border: 'none', background: '#ffffff', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => addToCart(item.id)}
                      >
                        <Plus size={14} color="#0284c7" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Request Submission to Admin Panel */}
          <div>
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              position: 'sticky',
              top: '20px'
            }}>
              <span className="card-header-meta" style={{ color: '#0284c7' }}>DIRECT PROCUREMENT</span>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '14px' }}>
                Produce Request to Admin
              </h3>

              {totalCrates === 0 ? (
                <div style={{ textAlign: 'center', padding: '30px 10px', color: '#94a3b8' }}>
                  <ShoppingCart size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                  <p style={{ fontSize: '13px' }}>No produce selected yet. Click <strong>"Select Quantity"</strong> on any available harvest above.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRequest}>
                  {/* Selected Items Breakdown */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Selected Produce & Quantities:
                    </div>
                    {Object.entries(cart).map(([id, qty]) => {
                      const item = CONSUMER_CATALOG.find(c => c.id === id);
                      if (!item) return null;
                      return (
                        <div key={id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12.5px', padding: '6px 10px', background: '#f8fafc', borderRadius: '6px' }}>
                          <div>
                            <strong>{item.name}</strong>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Origin: {item.fpoSource.split(' ')[0]} Hub</div>
                          </div>
                          <span className="mono" style={{ fontWeight: '700', color: '#0284c7' }}>
                            {qty} Crates ({qty * item.crateWeightKg} kg)
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: '#f0f9ff', padding: '10px 12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#0369a1', fontWeight: '600' }}>Total Quantity Requested:</span>
                    <span className="mono" style={{ fontSize: '15px', fontWeight: '800', color: '#0369a1' }}>
                      {totalCrates} Crates ({totalKg} kg)
                    </span>
                  </div>

                  {/* Consumer Details */}
                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Consumer / Household Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={consumerName} 
                      onChange={(e) => setConsumerName(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Contact Phone / Mobile</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '12px' }}>
                    <label className="form-label">Delivery Address & Pincode</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      required 
                    />
                  </div>

                  {/* Special Request / Notes to Admin */}
                  <div className="form-group" style={{ marginBottom: '18px' }}>
                    <label className="form-label">Special Request / Delivery Instructions to Admin</label>
                    <textarea 
                      className="form-input" 
                      rows="3"
                      placeholder="e.g. Please deliver before 10 AM. Prefer medium-sized firm produce. Coordinate with gate security."
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      background: '#0284c7',
                      width: '100%',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '13.5px'
                    }}
                  >
                    <Send size={15} />
                    <span>Submit Quantity Request to Admin</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: '#64748b', justifyContent: 'center' }}>
                    <ShieldCheck size={14} color="#15803d" />
                    <span>Admin directly routes this request to the local FPO hub</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* VIEW 2: My Requests & Order History */}
      {activeView === 'my_requests' && (
        <div className="content-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', margin: '0 0 2px' }}>
                Your Submitted Produce Requests
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                Real-time tracking of requests submitted to Platform Admin for FPO allocation and fulfillment.
              </p>
            </div>
            <button
              className="btn-primary"
              style={{ background: '#0284c7', padding: '6px 14px', fontSize: '12px' }}
              onClick={() => setActiveView('catalog')}
            >
              + Create New Produce Request
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '10px 12px' }}>Request ID</th>
                  <th style={{ padding: '10px 12px' }}>Produce Items & Quantity</th>
                  <th style={{ padding: '10px 12px' }}>Total Weight</th>
                  <th style={{ padding: '10px 12px' }}>Special Request / Notes</th>
                  <th style={{ padding: '10px 12px' }}>Assigned FPO Hub</th>
                  <th style={{ padding: '10px 12px' }}>Time</th>
                  <th style={{ padding: '10px 12px' }}>Fulfillment Status</th>
                </tr>
              </thead>
              <tbody>
                {localRequests.map((req) => (
                  <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px' }} className="mono">
                      <strong>{req.id}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {req.items.map((it, idx) => (
                          <div key={idx} style={{ fontSize: '12.5px', fontWeight: '600', color: '#0f172a' }}>
                            • {it.name} <span className="mono" style={{ color: '#0284c7', fontWeight: '700' }}>({it.quantityCrates} crates / {it.totalKg} kg)</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px' }} className="mono">
                      <span style={{ fontWeight: '700', color: '#0369a1' }}>{req.totalKg} kg</span>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{req.totalCrates} crates</div>
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px', color: '#475569', maxWidth: '240px' }}>
                      "{req.specialRequest}"
                    </td>
                    <td style={{ padding: '12px', fontSize: '12px', color: '#166534', fontWeight: '600' }}>
                      <MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} />
                      {req.assignedFPO}
                    </td>
                    <td style={{ padding: '12px', fontSize: '11.5px', color: '#64748b' }}>
                      {req.timestamp}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span className="mono" style={{
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: '700',
                        background: req.status.includes('Delivered') ? '#dcfce7' : req.status.includes('Dispatched') ? '#e0f2fe' : req.status.includes('Assigned') ? '#fef3c7' : '#fee2e2',
                        color: req.status.includes('Delivered') ? '#15803d' : req.status.includes('Dispatched') ? '#0369a1' : req.status.includes('Assigned') ? '#b45309' : '#991b1b'
                      }}>
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
