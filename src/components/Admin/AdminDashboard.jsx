import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  User, 
  ShoppingCart, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  ArrowUpRight, 
  Search, 
  Filter,
  RefreshCw,
  PlusCircle,
  ClipboardList,
  MapPin,
  Clock,
  Truck,
  FileText,
  BadgeCheck,
  Send,
  Sparkles,
  Phone,
  Mail,
  X,
  ChevronRight,
  ExternalLink,
  Award,
  Scale,
  Calendar,
  Layers,
  ChevronDown,
  Radio,
  Navigation,
  Check
} from 'lucide-react';
import { 
  MASTER_ADMIN_DATA,
  INITIAL_CONSUMER_REQUESTS,
  INITIAL_COMPANY_REQUESTS,
  INITIAL_FARMER_REQUESTS,
  INITIAL_PLATFORM_INQUIRIES,
  PREDICTIVE_PRICE_FORECAST_7DAYS,
  SDG_IMPACT_GOALS
} from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function AdminDashboard({ 
  consumerRequests = INITIAL_CONSUMER_REQUESTS,
  platformInquiries = INITIAL_PLATFORM_INQUIRIES,
  setPlatformInquiries
}) {
  // Stakeholder role tab: 'consumers', 'fpos', 'companies', 'farmers'
  const [activeRoleTab, setActiveRoleTab] = useState('consumers');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  // Modals state for deep stakeholder inspection
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [selectedFpo, setSelectedFpo] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  // Broadcast Availability Inquiry Modal State
  const [broadcastModalOrder, setBroadcastModalOrder] = useState(null); // The order being broadcasted
  const [broadcastTargetState, setBroadcastTargetState] = useState('Maharashtra');
  const [broadcastTargetDistrict, setBroadcastTargetDistrict] = useState('Nashik');
  const [broadcastSelectedFpoId, setBroadcastSelectedFpoId] = useState('FPO-MH-01');
  const [broadcastCustomNote, setBroadcastCustomNote] = useState('');

  // Logistics Selection Modal State
  const [logisticsModalInquiry, setLogisticsModalInquiry] = useState(null);
  const [selectedLogisticsOption, setSelectedLogisticsOption] = useState('platform_3pl'); // 'fpo_direct', 'buyer_pickup', 'platform_3pl'

  // Dynamic Lists State
  const [consumersList, setConsumersList] = useState(MASTER_ADMIN_DATA.allConsumers);
  const [fposList, setFposList] = useState(MASTER_ADMIN_DATA.allFPOs);
  const [companiesList, setCompaniesList] = useState(MASTER_ADMIN_DATA.allCompanies);
  const [farmersList, setFarmersList] = useState(MASTER_ADMIN_DATA.allFarmers);

  // 7-Day AI Price Predictive Forecast State
  const [selectedForecastIndex, setSelectedForecastIndex] = useState(0);
  const [forecastBroadcastSuccess, setForecastBroadcastSuccess] = useState(false);

  const handleBroadcastPriceAlert = (cropForecast) => {
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    setForecastBroadcastSuccess(true);
    alert(`📢 Automated 7-Day Price Advisory broadcasted to all 22 registered FPOs & 450+ Smallholder Farmers via Multi-Lingual GSM SMS, WhatsApp, and IVR Voice Call!\n\nAlert Summary:\n${cropForecast.crop} - ${cropForecast.trendDirection}\n\n${cropForecast.marketIntelligenceSignal}`);
    setTimeout(() => setForecastBroadcastSuccess(false), 5000);
  };

  const stats = MASTER_ADMIN_DATA.stats;

  // =========================================================================
  // FPO State & District Hierarchy Calculations
  // =========================================================================
  const availableStates = useMemo(() => {
    const states = ['All', ...new Set(fposList.map(f => f.state))];
    return states;
  }, [fposList]);

  const districtsInSelectedState = useMemo(() => {
    const filtered = selectedState === 'All' 
      ? fposList 
      : fposList.filter(f => f.state === selectedState);
    
    // Calculate count of FPOs per district
    const districtCounts = {};
    filtered.forEach(f => {
      districtCounts[f.district] = (districtCounts[f.district] || 0) + 1;
    });

    return districtCounts;
  }, [fposList, selectedState]);

  // Filtered FPOs based on State, District, and Search Query
  const filteredFPOs = useMemo(() => {
    return fposList.filter(fpo => {
      const matchState = selectedState === 'All' || fpo.state === selectedState;
      const matchDistrict = selectedDistrict === 'All' || fpo.district === selectedDistrict;
      const matchQuery = searchQuery === '' || 
        fpo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.primaryCrops.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchState && matchDistrict && matchQuery;
    });
  }, [fposList, selectedState, selectedDistrict, searchQuery]);

  // Filtered Consumers based on Search Query
  const filteredConsumers = useMemo(() => {
    return consumersList.filter(c => {
      return searchQuery === '' ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery);
    });
  }, [consumersList, searchQuery]);

  // Filtered Companies based on Search Query
  const filteredCompanies = useMemo(() => {
    return companiesList.filter(comp => {
      return searchQuery === '' ||
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.activeDemand.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [companiesList, searchQuery]);

  // Filtered Farmers based on Search Query
  const filteredFarmers = useMemo(() => {
    return farmersList.filter(farmer => {
      return searchQuery === '' ||
        farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.village.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
        farmer.phone.includes(searchQuery);
    });
  }, [farmersList, searchQuery]);

  // Handle State Dropdown Change -> Reset District to 'All'
  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    setSelectedDistrict('All');
  };

  // =========================================================================
  // Demand Broadcast & Inquiries Actions
  // =========================================================================
  const handleOpenBroadcastModal = (order, type = 'consumer') => {
    setBroadcastModalOrder({ ...order, requestType: type });
    setBroadcastTargetState('Maharashtra');
    setBroadcastTargetDistrict('Nashik');
    setBroadcastSelectedFpoId('FPO-MH-01');
    setBroadcastCustomNote('');
  };

  const handleSendBroadcastInquiry = (e) => {
    e.preventDefault();
    if (!broadcastModalOrder) return;

    const targetFpo = fposList.find(f => f.id === broadcastSelectedFpoId) || fposList[0];

    const newInquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      requestId: broadcastModalOrder.orderId || broadcastModalOrder.id,
      requestType: broadcastModalOrder.requestType || 'consumer',
      requesterName: broadcastModalOrder.consumerName || broadcastModalOrder.name || broadcastModalOrder.companyName || 'Retail Consumer',
      requesterLocation: broadcastModalOrder.deliveryAddress || broadcastModalOrder.city || broadcastModalOrder.address || 'Mumbai Hub',
      crop: broadcastModalOrder.items ? broadcastModalOrder.items.map(i => i.name).join(', ') : (broadcastModalOrder.crop || 'Fresh Produce'),
      quantity: broadcastModalOrder.totalKg ? `${broadcastModalOrder.totalKg} kg (${broadcastModalOrder.totalCrates} Crates)` : (broadcastModalOrder.activeDemand || 'Bulk Supply'),
      quantityKg: broadcastModalOrder.totalKg || 100,
      targetState: broadcastTargetState,
      targetDistrict: broadcastTargetDistrict,
      targetFpoId: targetFpo.id,
      targetFpoName: targetFpo.name,
      inquiryDate: 'Just now',
      specialInstruction: broadcastCustomNote || broadcastModalOrder.specialRequest || 'Please check packhouse availability and quote your supply price.',
      status: 'Broadcasted (Pending FPO Quote)',
      fpoQuote: null,
      adminApproved: false,
      selectedLogistics: null
    };

    if (setPlatformInquiries) {
      setPlatformInquiries(prev => [newInquiry, ...prev]);
    }

    setBroadcastModalOrder(null);
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    alert(`Broadcast Inquiry #${newInquiry.id} sent to ${targetFpo.name} (${broadcastTargetDistrict}, ${broadcastTargetState})! When you switch to the FPO Portal, they will receive this notification to set their price quote.`);
  };

  // Admin approves FPO Quote -> Opens Logistics Selection Modal
  const handleApproveQuoteAndChooseLogistics = (inquiry) => {
    setLogisticsModalInquiry(inquiry);
  };

  // Confirm Logistics Option & Dispatch
  const handleConfirmLogistics = (e) => {
    e.preventDefault();
    if (!logisticsModalInquiry) return;

    const logisticsMap = {
      fpo_direct: {
        provider: `${logisticsModalInquiry.targetFpoName} Local Fleet`,
        vehicleNo: "MH-15-TC-3312 (Pickup Van)",
        driverName: "Kishore Patil (+91 94222-11990)",
        estimatedTransitHours: "24-36 hrs",
        costPerKg: "₹1.80/kg",
        trackingStatus: "Dispatched by FPO (Direct Delivery)"
      },
      buyer_pickup: {
        provider: "Buyer / Consumer Self-Pickup",
        vehicleNo: "Self Collection at FPO Packhouse",
        driverName: "Customer Arranged Gate Pass",
        estimatedTransitHours: "Same-Day Collection",
        costPerKg: "₹0.00",
        trackingStatus: "Packhouse Ready for Pickup"
      },
      platform_3pl: {
        provider: "KisanSetu AI Smart 3PL Cold-Chain Fleet",
        vehicleNo: "MH-15-EG-4920 (Reefer Van <12°C)",
        driverName: "Santosh Yadav (+91 98210-44921)",
        estimatedTransitHours: "Same-Day (3 hrs)",
        costPerKg: "₹3.20/kg",
        trackingStatus: "Dispatched via KisanSetu 3PL Cold-Chain (Live GPS Active)"
      }
    };

    const chosenDetails = logisticsMap[selectedLogisticsOption];

    if (setPlatformInquiries) {
      setPlatformInquiries(prev => prev.map(inq => {
        if (inq.id === logisticsModalInquiry.id) {
          return {
            ...inq,
            adminApproved: true,
            status: "Dispatched & In-Transit",
            selectedLogistics: selectedLogisticsOption,
            logisticsDetails: chosenDetails
          };
        }
        return inq;
      }));
    }

    setLogisticsModalInquiry(null);
    confetti({ particleCount: 80, spread: 75, origin: { y: 0.6 } });
    alert(`Order approved & dispatched via ${chosenDetails.provider}! Telemetry & GPS manifest issued.`);
  };

  return (
    <div className="admin-dashboard-view" style={{ maxWidth: '1380px', margin: '0 auto', paddingBottom: '50px' }}>
      
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #7c2d12 0%, #991b1b 100%)',
        borderRadius: '14px',
        padding: '24px 28px',
        color: '#ffffff',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 6px 20px rgba(124, 45, 18, 0.2)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '8px' }}>
            <ShieldCheck size={14} />
            <span>SUPER ADMIN MASTER COMMAND & STAKEHOLDER GOVERNANCE</span>
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '24px', fontWeight: '700', margin: '2px 0 6px' }}>
            Demand Broadcast, FPO Quotation & Logistics Command Hub
          </h2>
          <p style={{ fontSize: '13px', color: '#fed7aa', margin: 0, maxWidth: '780px' }}>
            Receive consumer & corporate orders, broadcast availability inquiries to State & District FPOs/Farmers, review incoming price quotes, approve allocations, and configure logistics handover (FPO Delivery, Self-Pickup, or Platform 3PL).
          </p>
        </div>

        <div style={{
          background: 'rgba(0,0,0,0.25)',
          padding: '14px 20px',
          borderRadius: '10px',
          textAlign: 'right',
          border: '1px solid rgba(255,255,255,0.12)'
        }}>
          <div style={{ fontSize: '11px', color: '#fdba74', fontWeight: '600' }}>TOTAL PLATFORM GMV</div>
          <div className="mono" style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>
            {stats.platformGMV}
          </div>
          <div style={{ fontSize: '11.5px', color: '#fed7aa', marginTop: '2px' }}>
            Active Escrow Vault: <strong>{stats.activeEscrowLocked}</strong>
          </div>
        </div>
      </div>

      {/* 4 Master Stakeholder Selector Cards with Prominent Logos & Side Headings */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#475569', letterSpacing: '0.5px' }}>
            SELECT STAKEHOLDER DIRECTORY TO INSPECT & GOVERN:
          </span>
          <span className="mono" style={{ fontSize: '11px', color: '#64748b' }}>
            4 Active Stakeholder Streams
          </span>
        </div>

        <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          
          {/* 1. Consumers Directory Card */}
          <div 
            className="kpi-card" 
            style={{ 
              cursor: 'pointer', 
              borderColor: activeRoleTab === 'consumers' ? '#0284c7' : '#e2e8f0', 
              borderLeft: activeRoleTab === 'consumers' ? '5px solid #0284c7' : '1px solid #e2e8f0', 
              background: activeRoleTab === 'consumers' ? '#f0f9ff' : '#ffffff',
              transform: activeRoleTab === 'consumers' ? 'translateY(-3px)' : 'none',
              boxShadow: activeRoleTab === 'consumers' ? '0 8px 20px rgba(2, 132, 199, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
              padding: '16px 18px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => { setActiveRoleTab('consumers'); setSearchQuery(''); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: activeRoleTab === 'consumers' ? '#0284c7' : '#e0f2fe',
                color: activeRoleTab === 'consumers' ? '#ffffff' : '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShoppingCart size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>STAKEHOLDER ROLE</div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Registered Consumers</h4>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px' }}>
              <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#0284c7' }}>
                {stats.totalConsumers.toLocaleString()}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '12px' }}>
                15 Requests Active
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
              Inspect retail orders & route demand
            </div>
          </div>

          {/* 2. FPOs Registry Card */}
          <div 
            className="kpi-card" 
            style={{ 
              cursor: 'pointer', 
              borderColor: activeRoleTab === 'fpos' ? '#166534' : '#e2e8f0', 
              borderLeft: activeRoleTab === 'fpos' ? '5px solid #166534' : '1px solid #e2e8f0', 
              background: activeRoleTab === 'fpos' ? '#f0fdf4' : '#ffffff',
              transform: activeRoleTab === 'fpos' ? 'translateY(-3px)' : 'none',
              boxShadow: activeRoleTab === 'fpos' ? '0 8px 20px rgba(22, 101, 52, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
              padding: '16px 18px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => { setActiveRoleTab('fpos'); setSearchQuery(''); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: activeRoleTab === 'fpos' ? '#166534' : '#dcfce7',
                color: activeRoleTab === 'fpos' ? '#ffffff' : '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Building2 size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>STAKEHOLDER ROLE</div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Registered FPOs</h4>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px' }}>
              <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#166534' }}>
                {fposList.length} FPOs
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '12px' }}>
                4 States · 11 Dist
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
              State & District packhouse hierarchy
            </div>
          </div>

          {/* 3. Bulk Companies Card */}
          <div 
            className="kpi-card" 
            style={{ 
              cursor: 'pointer', 
              borderColor: activeRoleTab === 'companies' ? '#0d2f1b' : '#e2e8f0', 
              borderLeft: activeRoleTab === 'companies' ? '5px solid #0d2f1b' : '1px solid #e2e8f0', 
              background: activeRoleTab === 'companies' ? '#f0fdf4' : '#ffffff',
              transform: activeRoleTab === 'companies' ? 'translateY(-3px)' : 'none',
              boxShadow: activeRoleTab === 'companies' ? '0 8px 20px rgba(13, 47, 27, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
              padding: '16px 18px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => { setActiveRoleTab('companies'); setSearchQuery(''); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: activeRoleTab === 'companies' ? '#0d2f1b' : '#ecfdf5',
                color: activeRoleTab === 'companies' ? '#ffffff' : '#0d2f1b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>STAKEHOLDER ROLE</div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Bulk Companies</h4>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px' }}>
              <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#0d2f1b' }}>
                {companiesList.length} Buyers
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '12px' }}>
                690 Tonnes Active
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
              Industrial enterprise demands & contracts
            </div>
          </div>

          {/* 4. Farmers Card */}
          <div 
            className="kpi-card" 
            style={{ 
              cursor: 'pointer', 
              borderColor: activeRoleTab === 'farmers' ? '#b45309' : '#e2e8f0', 
              borderLeft: activeRoleTab === 'farmers' ? '5px solid #b45309' : '1px solid #e2e8f0', 
              background: activeRoleTab === 'farmers' ? '#fffbeb' : '#ffffff',
              transform: activeRoleTab === 'farmers' ? 'translateY(-3px)' : 'none',
              boxShadow: activeRoleTab === 'farmers' ? '0 8px 20px rgba(180, 83, 9, 0.15)' : '0 2px 6px rgba(0,0,0,0.03)',
              padding: '16px 18px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => { setActiveRoleTab('farmers'); setSearchQuery(''); }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: activeRoleTab === 'farmers' ? '#b45309' : '#fef3c7',
                color: activeRoleTab === 'farmers' ? '#ffffff' : '#b45309',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <User size={20} />
              </div>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>STAKEHOLDER ROLE</div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Connected Farmers</h4>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '6px' }}>
              <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#b45309' }}>
                {stats.totalFarmers.toLocaleString()}
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '12px' }}>
                +₹5.80/kg Mandi
              </span>
            </div>
            <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '6px' }}>
              Rural smallholders & KYC records
            </div>
          </div>
        </div>
      </div>

      {/* Stakeholder Directory & Governance Table Card */}
      <div className="content-card">
        
        {/* Active Section Title & Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid #e2e8f0',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <span className="card-header-meta">
              ACTIVE INSPECTION STREAM · {activeRoleTab.toUpperCase()}
            </span>
            <h3 className="card-header-title" style={{ margin: '2px 0 0' }}>
              {activeRoleTab === 'consumers' && 'Registered Consumers Directory & Monthly Demand Inspection'}
              {activeRoleTab === 'fpos' && 'FPO State & District Hierarchical Registry & FPO Counts'}
              {activeRoleTab === 'companies' && 'Corporate Bulk Buyers & Industrial Demands'}
              {activeRoleTab === 'farmers' && 'Rural Smallholder Farmers & KYC Directory'}
            </h3>
          </div>

          {/* Global Search Input within Active Tab */}
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: '32px', fontSize: '12.5px', height: '36px' }}
              placeholder={`Search ${activeRoleTab}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '8px', top: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: CONSUMERS DIRECTORY & MONTHLY REQUESTS */}
        {/* ========================================================================= */}
        {activeRoleTab === 'consumers' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>
                  Registered Consumers Directory & Monthly Demand Inspection
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Master roster of retail households. Tap on any consumer to inspect this month's requests, specific produce items, crate/kg quantities, broadcast availability inquiries to State & District FPOs, and assign logistics.
                </p>
              </div>
              <span className="mono" style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                {filteredConsumers.length} Consumers Registered
              </span>
            </div>

            {/* Consumers Master Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                    <th style={{ padding: '12px 14px' }}>Consumer ID</th>
                    <th style={{ padding: '12px 14px' }}>Consumer Name & Status</th>
                    <th style={{ padding: '12px 14px' }}>Contact & City Area</th>
                    <th style={{ padding: '12px 14px' }}>This Month's Requests</th>
                    <th style={{ padding: '12px 14px' }}>This Month's Volume</th>
                    <th style={{ padding: '12px 14px' }}>FPO Inquiry / Quotation Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsumers.map((consumer) => {
                    const matchingInquiry = platformInquiries.find(inq => 
                      consumer.monthlyOrdersBreakdown.some(ord => ord.orderId === inq.requestId)
                    );

                    return (
                      <tr 
                        key={consumer.id} 
                        style={{ 
                          borderBottom: '1px solid #f1f5f9',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                        onClick={() => setSelectedConsumer(consumer)}
                      >
                        <td style={{ padding: '12px 14px' }} className="mono">
                          <strong>{consumer.id}</strong>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>Reg: {consumer.registrationDate}</div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <strong style={{ color: '#0f172a', fontSize: '13.5px' }}>{consumer.name}</strong>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <BadgeCheck size={13} color="#0284c7" />
                            <span style={{ fontSize: '11px', color: '#0369a1', fontWeight: '600' }}>{consumer.verificationStatus}</span>
                          </div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0f172a', fontSize: '12px' }}>
                            <Phone size={11} color="#64748b" /> {consumer.phone}
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#475569', marginTop: '2px' }}>
                            <MapPin size={11} style={{ display: 'inline', marginRight: '2px', color: '#0284c7' }} />
                            {consumer.city} ({consumer.area})
                          </div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          <span className="mono" style={{
                            background: '#e0f2fe',
                            color: '#0369a1',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontWeight: '800',
                            fontSize: '12px'
                          }}>
                            ⚡ {consumer.thisMonthRequestsCount} Requests
                          </span>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '3px' }}>
                            Last: {consumer.lastRequestTime}
                          </div>
                        </td>

                        <td style={{ padding: '12px 14px' }} className="mono">
                          <strong style={{ color: '#0369a1', fontSize: '13.5px' }}>{consumer.thisMonthKg} kg</strong>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{consumer.thisMonthCrates} crates requested</div>
                        </td>

                        <td style={{ padding: '12px 14px' }}>
                          {matchingInquiry ? (
                            <div>
                              {matchingInquiry.fpoQuote ? (
                                <span className="mono" style={{
                                  background: '#dcfce7',
                                  color: '#15803d',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  display: 'inline-block'
                                }}>
                                  ✓ Quote: ₹{matchingInquiry.fpoQuote.pricePerKg}/kg ({matchingInquiry.targetFpoName.split(' ')[0]})
                                </span>
                              ) : (
                                <span className="mono" style={{
                                  background: '#fef3c7',
                                  color: '#b45309',
                                  padding: '3px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  display: 'inline-block'
                                }}>
                                  📡 Inquired: {matchingInquiry.targetFpoName.split(' ')[0]} (Pending Quote)
                                </span>
                              )}
                              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                Status: {matchingInquiry.status}
                              </div>
                            </div>
                          ) : (
                            <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                              Direct FPO Hub Allocated
                            </span>
                          )}
                        </td>

                        <td style={{ padding: '12px 14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                          <button
                            className="btn-primary"
                            style={{
                              background: '#0284c7',
                              padding: '5px 12px',
                              fontSize: '11.5px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onClick={() => setSelectedConsumer(consumer)}
                          >
                            <span>Inspect & Route</span>
                            <ArrowUpRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 2: FPO STATE & DISTRICT HIERARCHY (CLEAN DROPDOWN SELECTORS) */}
        {/* ========================================================================= */}
        {activeRoleTab === 'fpos' && (
          <div>
            {/* Header Description */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>
                  FPO State & District Hierarchical Registry & FPO Counts
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Choose a State and District from the dropdown menus below to filter registered FPOs and inspect their smallholder clusters.
                </p>
              </div>
              <span className="mono" style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                {filteredFPOs.length} of {fposList.length} FPOs Displayed
              </span>
            </div>

            {/* Hierarchical Filter Box: CLEAN DROPDOWN SELECTORS */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              padding: '18px 22px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', alignItems: 'flex-end' }}>
                
                {/* 1. State Dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', textTransform: 'uppercase' }}>
                    <MapPin size={13} style={{ display: 'inline', marginRight: '4px', color: '#166534' }} />
                    Step 1: Select State
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="form-select"
                      style={{
                        height: '42px',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderColor: selectedState !== 'All' ? '#166534' : '#cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer'
                      }}
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      {availableStates.map(state => {
                        const countInState = state === 'All' 
                          ? fposList.length 
                          : fposList.filter(f => f.state === state).length;
                        return (
                          <option key={state} value={state}>
                            {state === 'All' ? `🇮🇳 All States (${countInState} FPOs)` : `${state} (${countInState} FPOs)`}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* 2. Cascading District Dropdown */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', textTransform: 'uppercase' }}>
                    <Building2 size={13} style={{ display: 'inline', marginRight: '4px', color: '#0284c7' }} />
                    Step 2: Select District
                  </label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="form-select"
                      style={{
                        height: '42px',
                        fontSize: '13px',
                        fontWeight: '600',
                        borderColor: selectedDistrict !== 'All' ? '#0284c7' : '#cbd5e1',
                        background: '#ffffff',
                        cursor: 'pointer'
                      }}
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      <option value="All">
                        All Districts in {selectedState === 'All' ? 'All States' : selectedState} ({Object.values(districtsInSelectedState).reduce((a, b) => a + b, 0)} FPOs)
                      </option>
                      {Object.entries(districtsInSelectedState).map(([districtName, count]) => (
                        <option key={districtName} value={districtName}>
                          {districtName} District ({count} {count === 1 ? 'FPO' : 'FPOs'} registered)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 3. Search Bar */}
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '6px', textTransform: 'uppercase' }}>
                    <Search size={13} style={{ display: 'inline', marginRight: '4px', color: '#64748b' }} />
                    Quick Search FPOs
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    style={{ height: '42px', fontSize: '13px' }}
                    placeholder="Search by FPO name, crop, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Active Selection Banner */}
              <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px',
                color: '#334155'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#166534" />
                  <span>
                    Active Hierarchy: <strong>{selectedState === 'All' ? 'All States' : selectedState}</strong> &gt; <strong>{selectedDistrict === 'All' ? 'All Districts' : `${selectedDistrict} District`}</strong>
                  </span>
                </div>

                <div className="mono" style={{ fontWeight: '700', color: '#166534', background: '#dcfce7', padding: '3px 10px', borderRadius: '6px' }}>
                  🏢 {filteredFPOs.length} Registered FPOs · 🌾 {filteredFPOs.reduce((a, b) => a + b.farmers, 0)} Smallholders Connected
                </div>
              </div>
            </div>

            {/* FPO Master Directory Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                    <th style={{ padding: '12px 14px' }}>FPO ID & Reg No</th>
                    <th style={{ padding: '12px 14px' }}>FPO Organization</th>
                    <th style={{ padding: '12px 14px' }}>State & District</th>
                    <th style={{ padding: '12px 14px' }}>Connected Farmers</th>
                    <th style={{ padding: '12px 14px' }}>Pooled Harvest Capacity</th>
                    <th style={{ padding: '12px 14px' }}>Primary Crops</th>
                    <th style={{ padding: '12px 14px' }}>Quality Grade</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFPOs.map((fpo) => (
                    <tr 
                      key={fpo.id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                      onClick={() => setSelectedFpo(fpo)}
                    >
                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong>{fpo.id}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{fpo.regNo}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <strong style={{ color: '#0d2f1b', fontSize: '13.5px' }}>{fpo.name}</strong>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>Director: {fpo.directorName}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span style={{ fontWeight: '700', color: '#0f172a' }}>{fpo.district}</span>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>{fpo.state} ({fpo.taluka})</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong style={{ color: '#166534', fontSize: '13px' }}>{fpo.farmers} Smallholders</strong>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong style={{ color: '#15803d', fontSize: '13.5px' }}>{fpo.pooledVolume}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>({fpo.pooledVolumeKg.toLocaleString()} kg)</div>
                      </td>

                      <td style={{ padding: '12px 14px', fontSize: '12px', color: '#334155', maxWidth: '200px' }}>
                        {fpo.primaryCrops}
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          color: '#15803d',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>
                          {fpo.verifiedGrade}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span className="mono" style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: '700',
                          background: fpo.status.includes('Active') ? '#dcfce7' : '#fef3c7',
                          color: fpo.status.includes('Active') ? '#15803d' : '#b45309'
                        }}>
                          {fpo.status}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn-primary"
                          style={{
                            background: '#166534',
                            padding: '5px 12px',
                            fontSize: '11.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onClick={() => setSelectedFpo(fpo)}
                        >
                          <span>Inspect Dossier</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 3: COMPANIES / BULK BUYERS */}
        {/* ========================================================================= */}
        {activeRoleTab === 'companies' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>
                  Enterprise Bulk Buyers Directory & Procurement Demands
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Master directory of corporate buyers. Broadcast large 10t–500t procurement demands to State & District FPOs, review FPO price quotes, and manage 3PL cold-chain dispatches.
                </p>
              </div>
              <span className="mono" style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                {filteredCompanies.length} Bulk Buyers Registered
              </span>
            </div>

            {/* Companies Master Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                    <th style={{ padding: '12px 14px' }}>Company ID</th>
                    <th style={{ padding: '12px 14px' }}>Corporate Name & Type</th>
                    <th style={{ padding: '12px 14px' }}>GSTIN & CIN</th>
                    <th style={{ padding: '12px 14px' }}>Active Bulk Demand</th>
                    <th style={{ padding: '12px 14px' }}>Escrow Deposited</th>
                    <th style={{ padding: '12px 14px' }}>Monthly Volume</th>
                    <th style={{ padding: '12px 14px' }}>Status</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCompanies.map((comp) => (
                    <tr 
                      key={comp.id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                      onClick={() => setSelectedCompany(comp)}
                    >
                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong>{comp.id}</strong>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <strong style={{ color: '#0d2f1b', fontSize: '13.5px' }}>{comp.name}</strong>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>{comp.type}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <div style={{ fontSize: '12px', color: '#0f172a' }}>{comp.gstin}</div>
                        <div style={{ fontSize: '10.5px', color: '#64748b' }}>{comp.cin}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <strong style={{ color: '#166534' }}>{comp.activeDemand}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{comp.activeDemandsCount} broadcast demands</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong style={{ color: '#15803d', fontSize: '13.5px' }}>{comp.escrowDeposited}</strong>
                        <div style={{ fontSize: '10.5px', color: '#15803d' }}>{comp.escrowStatus}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        {comp.monthlyProcurementVolumeTonnes} Tonnes / mo
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span className="mono" style={{
                          fontSize: '11px',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontWeight: '700',
                          background: '#dcfce7',
                          color: '#15803d'
                        }}>
                          {comp.status}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn-primary"
                          style={{
                            background: '#0d2f1b',
                            padding: '5px 12px',
                            fontSize: '11.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onClick={() => setSelectedCompany(comp)}
                        >
                          <span>Inspect & Broadcast</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: RURAL SMALLHOLDER FARMERS */}
        {/* ========================================================================= */}
        {activeRoleTab === 'farmers' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f172a', margin: '0 0 2px' }}>
                  Rural Smallholder Farmers Directory & Harvest Lots
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Master roster of individual producers. Tap any farmer to inspect crop harvest batches, direct electronic weighbridge slips, payout realization, and pickup scheduling.
                </p>
              </div>
              <span className="mono" style={{ fontSize: '12px', background: '#fffbeb', color: '#b45309', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
                {filteredFarmers.length} Connected Farmers
              </span>
            </div>

            {/* Farmers Master Table */}
            <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#475569' }}>
                    <th style={{ padding: '12px 14px' }}>Farmer ID</th>
                    <th style={{ padding: '12px 14px' }}>Farmer Name</th>
                    <th style={{ padding: '12px 14px' }}>Village / District</th>
                    <th style={{ padding: '12px 14px' }}>FPO Affiliation</th>
                    <th style={{ padding: '12px 14px' }}>Harvest Ready Lot</th>
                    <th style={{ padding: '12px 14px' }}>Rate Realization</th>
                    <th style={{ padding: '12px 14px' }}>Bank / UPI Payout</th>
                    <th style={{ padding: '12px 14px' }}>Tech Access</th>
                    <th style={{ padding: '12px 14px', textAlign: 'center' }}>Admin Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFarmers.map((farmer) => (
                    <tr 
                      key={farmer.id} 
                      style={{ 
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fffbeb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                      onClick={() => setSelectedFarmer(farmer)}
                    >
                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong>{farmer.id}</strong>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <strong style={{ color: '#0f172a', fontSize: '13.5px' }}>{farmer.name}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Land: {farmer.landAcres} Acres</div>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ color: '#0f172a', fontWeight: '600', fontSize: '12.5px' }}>{farmer.village}</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>{farmer.district}, {farmer.state}</div>
                      </td>

                      <td style={{ padding: '12px 14px', fontSize: '12px', color: '#166534', fontWeight: '600' }}>
                        {farmer.fpoAffiliation}
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong style={{ color: '#b45309', fontSize: '13.5px' }}>{farmer.harvestKg.toLocaleString()} kg</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{farmer.crop} ({farmer.readyDate})</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <span style={{ color: '#15803d', fontWeight: '700', fontSize: '12px' }}>
                          {farmer.rateRealizationBonus}
                        </span>
                        <div style={{ fontSize: '10.5px', color: '#64748b' }}>Mandi: {farmer.mandiRate} vs Platform: {farmer.platformRate}</div>
                      </td>

                      <td style={{ padding: '12px 14px' }} className="mono">
                        <strong style={{ color: '#15803d', fontSize: '13.5px' }}>{farmer.bankPayout}</strong>
                      </td>

                      <td style={{ padding: '12px 14px' }}>
                        <span className="mono" style={{
                          fontSize: '10.5px',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: farmer.techStatus.includes('Offline') ? '#fffbeb' : '#f0fdf4',
                          color: farmer.techStatus.includes('Offline') ? '#b45309' : '#15803d',
                          fontWeight: '700'
                        }}>
                          {farmer.techStatus}
                        </span>
                      </td>

                      <td style={{ padding: '12px 14px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                        <button
                          className="btn-primary"
                          style={{
                            background: '#b45309',
                            padding: '5px 12px',
                            fontSize: '11.5px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onClick={() => setSelectedFarmer(farmer)}
                        >
                          <span>Inspect Farmer</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: 7-DAY AI PRICE PREDICTIVE FORECASTING & GLUT/SURGE INTELLIGENCE */}
      {/* ========================================================================= */}
      {(() => {
        const currentForecast = PREDICTIVE_PRICE_FORECAST_7DAYS[selectedForecastIndex] || PREDICTIVE_PRICE_FORECAST_7DAYS[0];
        const allPoints = [
          ...currentForecast.historicalTrend.map(p => ({ ...p, isPredicted: false })),
          ...currentForecast.predicted7Days.map(p => ({ ...p, isPredicted: true }))
        ];
        const prices = allPoints.map(p => p.price);
        const minP = Math.floor(Math.min(...prices) * 0.9);
        const maxP = Math.ceil(Math.max(...prices) * 1.08);
        const svgW = 740;
        const svgH = 200;
        const padL = 45;
        const padR = 40;
        const padT = 25;
        const padB = 35;
        const chartW = svgW - padL - padR;
        const chartH = svgH - padT - padB;

        const coords = allPoints.map((p, i) => {
          const x = padL + (i * chartW) / (allPoints.length - 1);
          const y = padT + chartH - ((p.price - minP) / (maxP - minP || 1)) * chartH;
          return { x, y, ...p };
        });

        const histCoords = coords.slice(0, 4);
        const predCoords = coords.slice(3);

        const histPath = histCoords.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
        const predPath = predCoords.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '');
        const areaPath = `${coords.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`, '')} L ${coords[coords.length - 1].x},${padT + chartH} L ${coords[0].x},${padT + chartH} Z`;

        const isDrop = currentForecast.alertType === 'warning_drop';
        const isSurge = currentForecast.alertType === 'opportunity_surge';
        const themeColor = isDrop ? '#ef4444' : isSurge ? '#10b981' : '#3b82f6';
        const themeBg = isDrop ? '#fef2f2' : isSurge ? '#f0fdf4' : '#eff6ff';
        const themeBorder = isDrop ? '#fecaca' : isSurge ? '#bbf7d0' : '#bfdbfe';

        return (
          <div className="content-card" style={{ marginTop: '24px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#065f46', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
                  <Sparkles size={13} color="#10b981" />
                  <span>AI MACHINE LEARNING ENGINE · MULTI-MANDI INGESTION & ARRIVAL PREDICTIONS</span>
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: '2px 0 4px' }}>
                  7-Day Short-Term Crop Price Predictive Graph & Market Intelligence
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                  Real-time neural forecast correlating APMC arrivals, weather anomalies, logistics freight rates, and retail consumption curves.
                </p>
              </div>

              {/* 1-Click Broadcast Warning Button */}
              <button
                className="btn-primary"
                onClick={() => handleBroadcastPriceAlert(currentForecast)}
                style={{
                  background: isDrop ? '#dc2626' : '#166534',
                  padding: '10px 18px',
                  fontSize: '12.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isDrop ? '0 4px 14px rgba(220, 38, 38, 0.3)' : '0 4px 14px rgba(22, 101, 52, 0.25)'
                }}
              >
                <Radio size={15} />
                <span>📢 Broadcast {isDrop ? 'Price Drop Warning' : 'Demand Advisory'} to 22 FPOs</span>
              </button>
            </div>

            {/* Crop Selection Pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
              {PREDICTIVE_PRICE_FORECAST_7DAYS.map((forecast, idx) => {
                const isActive = selectedForecastIndex === idx;
                const cropDrop = forecast.alertType === 'warning_drop';
                return (
                  <button
                    key={forecast.crop}
                    onClick={() => setSelectedForecastIndex(idx)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: isActive ? `2px solid ${cropDrop ? '#dc2626' : '#166534'}` : '1px solid #e2e8f0',
                      background: isActive ? (cropDrop ? '#fef2f2' : '#f0fdf4') : '#ffffff',
                      color: isActive ? (cropDrop ? '#991b1b' : '#14532d') : '#475569',
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{forecast.crop}</span>
                    <span className="mono" style={{
                      fontSize: '11px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: cropDrop ? '#fee2e2' : '#dcfce7',
                      color: cropDrop ? '#b91c1c' : '#15803d',
                      fontWeight: '800'
                    }}>
                      {forecast.trendDirection}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Graph Grid & Alert Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '20px', alignItems: 'stretch' }}>
              
              {/* SVG Price Chart Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                      Price Curve: {currentForecast.crop} (₹/kg)
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                      Historical (Past 3 Days) ➔ AI Projected (Next 7 Days)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '10px', height: '3px', background: '#0284c7', display: 'inline-block' }}></span>
                      <span style={{ color: '#475569' }}>Historical</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '10px', height: '2px', borderTop: '2px dashed #dc2626', display: 'inline-block' }}></span>
                      <span style={{ color: '#dc2626', fontWeight: '600' }}>AI Forecast</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual */}
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
                    <defs>
                      <linearGradient id={`grad-${selectedForecastIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={themeColor} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={themeColor} stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Background Grid Lines */}
                    {[0.25, 0.5, 0.75, 1.0].map((ratio, rIdx) => {
                      const yPos = padT + chartH * (1 - ratio);
                      const priceVal = (minP + (maxP - minP) * ratio).toFixed(1);
                      return (
                        <g key={rIdx}>
                          <line x1={padL} y1={yPos} x2={svgW - padR} y2={yPos} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                          <text x={padL - 6} y={yPos + 3} textAnchor="end" fontSize="9.5" fill="#94a3b8" fontFamily="JetBrains Mono, monospace">
                            ₹{priceVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Today Vertical Guideline */}
                    <line
                      x1={coords[3]?.x || 0}
                      y1={padT}
                      x2={coords[3]?.x || 0}
                      y2={padT + chartH}
                      stroke="#cbd5e1"
                      strokeWidth="1.5"
                      strokeDasharray="2,2"
                    />
                    <text x={coords[3]?.x || 0} y={padT - 6} textAnchor="middle" fontSize="9.5" fill="#0284c7" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                      📍 TODAY
                    </text>

                    {/* Area fill */}
                    <path d={areaPath} fill={`url(#grad-${selectedForecastIndex})`} />

                    {/* Historical Solid Line */}
                    <path d={histPath} fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Predicted Dashed Line */}
                    <path d={predPath} fill="none" stroke={themeColor} strokeWidth="2.5" strokeDasharray="5,4" strokeLinecap="round" />

                    {/* Data Points */}
                    {coords.map((pt, i) => (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={i === 3 ? "5.5" : "4"}
                          fill={pt.isPredicted ? themeColor : "#0284c7"}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          fontSize="9.5"
                          fontWeight="700"
                          fill={pt.isPredicted ? (isDrop ? '#dc2626' : '#059669') : '#0369a1'}
                          fontFamily="JetBrains Mono, monospace"
                        >
                          ₹{pt.price.toFixed(1)}
                        </text>
                        <text
                          x={pt.x}
                          y={padT + chartH + 15}
                          textAnchor="middle"
                          fontSize="8.5"
                          fill={i === 3 ? "#0284c7" : "#64748b"}
                          fontWeight={i === 3 ? "800" : "500"}
                          fontFamily="sans-serif"
                        >
                          {pt.day.replace('Day ', 'D')}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Right Alert & Intelligence Signal Card */}
              <div style={{
                background: themeBg,
                border: `1px solid ${themeBorder}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="mono" style={{ fontSize: '11px', fontWeight: '800', color: themeColor, textTransform: 'uppercase' }}>
                      {isDrop ? '⚠️ GLUT & PRICE DROP WARNING' : isSurge ? '🚀 EXPORT / DEMAND SURGE DETECTED' : '⚖️ STABLE PRICE CORRIDOR'}
                    </span>
                    <span className="mono" style={{ fontSize: '12px', fontWeight: '800', background: '#ffffff', padding: '3px 8px', borderRadius: '4px', border: `1px solid ${themeBorder}`, color: themeColor }}>
                      {currentForecast.trendDirection}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: '0 0 10px' }}>
                    Automated Advisory for FPOs & Smallholders
                  </h4>

                  <p style={{ fontSize: '12.5px', color: '#334155', lineHeight: '1.55', margin: '0 0 16px', background: 'rgba(255,255,255,0.7)', padding: '12px', borderRadius: '8px', border: `1px solid ${themeBorder}` }}>
                    {currentForecast.marketIntelligenceSignal}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#475569' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Current Farm-Gate Benchmark:</span>
                      <strong className="mono" style={{ color: '#0f172a' }}>₹{currentForecast.currentPrice.toFixed(2)}/kg</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Projected Day +7 Rate:</span>
                      <strong className="mono" style={{ color: themeColor }}>
                        ₹{currentForecast.predicted7Days[currentForecast.predicted7Days.length - 1].price.toFixed(2)}/kg
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>AI Model Confidence:</span>
                      <strong className="mono" style={{ color: '#15803d' }}>
                        {currentForecast.predicted7Days[0].confidence} (High Reliability)
                      </strong>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '16px', borderTop: `1px solid ${themeBorder}`, paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="#166534" />
                  <span style={{ fontSize: '11px', color: '#166534', fontWeight: '600' }}>
                    Linked with Kisan Sahayak AI Chatbot & 8-Language Multi-Channel Voice Dispatcher
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* SECTION 4: UN SUSTAINABLE DEVELOPMENT GOALS (SDGs) & COMPETITIVE ADVANTAGE */}
      {/* ========================================================================= */}
      <div className="content-card" style={{ marginTop: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#eff6ff', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
              <Award size={13} color="#3b82f6" />
              <span>GLOBAL ESG & UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS</span>
            </div>
            <h3 style={{ fontSize: '19px', fontWeight: '800', color: '#0f172a', margin: '2px 0 4px' }}>
              UN SDG Impact Alignment & Competitive Advantage vs Mandi Middlemen
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              Measurable socioeconomic upliftment, post-harvest food waste mitigation, and clean cold chain logistics.
            </p>
          </div>

          <span className="mono" style={{ fontSize: '12px', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: '700' }}>
            5 UN SDGs Championed
          </span>
        </div>

        {/* 5 SDG Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
          {SDG_IMPACT_GOALS.map((sdg) => (
            <div
              key={sdg.sdgNumber}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderTop: `4px solid ${sdg.color}`,
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span className="mono" style={{ fontSize: '12px', fontWeight: '800', color: sdg.color }}>
                    SDG {sdg.sdgNumber}
                  </span>
                  <span style={{ fontSize: '10px', background: `${sdg.color}15`, color: sdg.color, padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                    {sdg.badge}
                  </span>
                </div>

                <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px', lineHeight: '1.3' }}>
                  {sdg.title}
                </h4>

                <p style={{ fontSize: '11.5px', color: '#64748b', lineHeight: '1.45', margin: '0 0 10px' }}>
                  {sdg.target}
                </p>
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '8px 10px',
                borderRadius: '6px',
                marginTop: '6px'
              }}>
                <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>Platform Metric</div>
                <div className="mono" style={{ fontSize: '12px', fontWeight: '800', color: sdg.color, marginTop: '2px' }}>
                  {sdg.quantifiableMetric}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Competitive Advantage vs Mandi Comparison Table */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ background: '#f8fafc', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Scale size={16} color="#0f172a" />
            <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>
              Why KisanSetu Wins: Structural Comparison Against APMC Mandis
            </strong>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', textAlign: 'left', color: '#475569', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '10px 14px' }}>Feature / Dimension</th>
                <th style={{ padding: '10px 14px' }}>Traditional APMC Mandi System</th>
                <th style={{ padding: '10px 14px', background: '#dcfce7', color: '#14532d' }}>KisanSetu Demand-Driven OS</th>
                <th style={{ padding: '10px 14px' }}>Farmer / Buyer Impact</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>Middlemen Intermediation</td>
                <td style={{ padding: '10px 14px', color: '#dc2626' }}>4 to 6 tiers of commission agents (arhatiyas, brokers, wholesalers)</td>
                <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '700', background: '#f0fdf4' }}>Zero Middlemen (Direct FPO/Farmer to Buyer escrow match)</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>+₹5.80/kg higher farm-gate realization</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>Payment Settlement</td>
                <td style={{ padding: '10px 14px', color: '#dc2626' }}>15–45 day credit delays, unrecorded cash cuts, bad debt risk</td>
                <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '700', background: '#f0fdf4' }}>100% Pre-Funded Escrow Vault with same-day UPI/NEFT release</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Instant liquidity & zero payment default</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>Post-Harvest Spoilage</td>
                <td style={{ padding: '10px 14px', color: '#dc2626' }}>18–25% wastage in open gunny bags and non-refrigerated transit</td>
                <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '700', background: '#f0fdf4' }}>Cold-chain telemetry & IoT reefer vans keeping loss &lt;3.5%</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Saves 35,000+ kg food waste annually</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>Price Transparency & AI</td>
                <td style={{ padding: '10px 14px', color: '#dc2626' }}>Opaque secret towel bidding and cartel-driven distress sales</td>
                <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '700', background: '#f0fdf4' }}>7-Day Predictive AI Machine Learning & Fair Government MSP benchmarks</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>FPOs sell ahead of market gluts</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 14px', fontWeight: '700' }}>Farmer Accessibility</td>
                <td style={{ padding: '10px 14px', color: '#dc2626' }}>Requires physical physical travel to town mandis with transport costs</td>
                <td style={{ padding: '10px 14px', color: '#15803d', fontWeight: '700', background: '#f0fdf4' }}>8-Language Voice Memos, GSM SMS, WhatsApp & Kisan Sahayak AI</td>
                <td style={{ padding: '10px 14px', color: '#0f172a' }}>Non-smartphone rural farmers fully included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CONSUMER AUDIT & ORDER DETAILS DOSSIER */}
      {/* ========================================================================= */}
      {selectedConsumer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '860px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
                  <ShoppingCart size={13} />
                  <span>CONSUMER AUDIT DOSSIER · {selectedConsumer.id}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px' }}>
                  {selectedConsumer.name}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#e0f2fe', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span><Phone size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedConsumer.phone}</span>
                  <span><Mail size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedConsumer.email}</span>
                  <span><MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedConsumer.city} ({selectedConsumer.area})</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedConsumer(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              
              {/* This Month's Summary KPI Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '22px' }}>
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#0369a1', fontWeight: '700' }}>THIS MONTH'S REQUESTS</div>
                  <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#0284c7' }}>
                    {selectedConsumer.thisMonthRequestsCount} Requests
                  </div>
                </div>

                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#0369a1', fontWeight: '700' }}>THIS MONTH'S WEIGHT</div>
                  <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#0284c7' }}>
                    {selectedConsumer.thisMonthKg} kg ({selectedConsumer.thisMonthCrates} crates)
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>LIFETIME VOLUME</div>
                  <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedConsumer.lifetimeKg} kg
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>LIFETIME ORDERS</div>
                  <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedConsumer.lifetimeOrdersCount} Orders
                  </div>
                </div>
              </div>

              {/* Delivery Address Box */}
              <div style={{
                background: '#fafaf9',
                border: '1px solid #e7e5e4',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <MapPin size={18} color="#0284c7" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: '12.5px', color: '#44403c' }}>
                  <strong>Registered Delivery Address:</strong> {selectedConsumer.address}
                </div>
              </div>

              {/* Detailed Breakdown of All Monthly Requests */}
              <h4 style={{ fontSize: '15.5px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                Itemized Orders & Quantities Requested This Month:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedConsumer.monthlyOrdersBreakdown.map((order) => {
                  const matchingInq = platformInquiries.find(inq => inq.requestId === order.orderId);

                  return (
                    <div 
                      key={order.orderId}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '16px',
                        background: '#ffffff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                    >
                      {/* Order Top Bar */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="mono" style={{ fontWeight: '800', color: '#0f172a', fontSize: '14px' }}>
                            Order #{order.orderId}
                          </span>
                          <span style={{ fontSize: '11.5px', color: '#64748b' }}>
                            <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                            {order.date}
                          </span>
                        </div>

                        <span className="mono" style={{
                          fontSize: '11.5px',
                          padding: '3px 10px',
                          borderRadius: '6px',
                          fontWeight: '700',
                          background: order.status.includes('Delivered') ? '#dcfce7' : order.status.includes('Dispatched') ? '#e0f2fe' : order.status.includes('Assigned') ? '#fef3c7' : '#fee2e2',
                          color: order.status.includes('Delivered') ? '#15803d' : order.status.includes('Dispatched') ? '#0369a1' : order.status.includes('Assigned') ? '#b45309' : '#991b1b'
                        }}>
                          {order.status}
                        </span>
                      </div>

                      {/* Produce Items & Specific Quantities */}
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                          Produce Items & Exact Quantities:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {order.items.map((it, idx) => (
                            <div 
                              key={idx}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: '#f8fafc',
                                padding: '8px 12px',
                                borderRadius: '6px',
                                fontSize: '13px'
                              }}
                            >
                              <div>
                                <strong>{it.name}</strong>
                                <span style={{ fontSize: '11px', color: '#166534', marginLeft: '8px', fontWeight: '600' }}>
                                  [{it.grade}]
                                </span>
                              </div>
                              <span className="mono" style={{ fontWeight: '800', color: '#0284c7', fontSize: '13.5px' }}>
                                {it.quantityCrates} Crates ({it.totalKg} kg)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total Weight & Assigned FPO */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px', fontSize: '12.5px' }}>
                        <div style={{ background: '#f0f9ff', padding: '8px 12px', borderRadius: '6px' }}>
                          <span style={{ color: '#0369a1' }}>Total Quantity:</span> <strong>{order.totalCrates} Crates ({order.totalKg} kg)</strong>
                        </div>
                        <div style={{ background: '#f0fdf4', padding: '8px 12px', borderRadius: '6px' }}>
                          <span style={{ color: '#166534' }}>Assigned FPO:</span> <strong>{order.assignedFPO}</strong>
                        </div>
                      </div>

                      {/* Consumer's Special Request / Note */}
                      <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', padding: '10px 12px', borderRadius: '6px', fontSize: '12px', color: '#92400e', marginBottom: '12px' }}>
                        <strong>Consumer's Special Note:</strong> "{order.specialRequest}"
                      </div>

                      {/* Live Inquiry & FPO Quotation Status Box */}
                      {matchingInq && (
                        <div style={{
                          background: matchingInq.fpoQuote ? '#f0fdf4' : '#fffbeb',
                          border: matchingInq.fpoQuote ? '1px solid #bbf7d0' : '1px solid #fef3c7',
                          borderRadius: '8px',
                          padding: '12px',
                          marginBottom: '12px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span style={{ fontSize: '12px', fontWeight: '700', color: matchingInq.fpoQuote ? '#166534' : '#b45309' }}>
                              📡 State/District Availability Inquiry #{matchingInq.id} ({matchingInq.targetFpoName})
                            </span>
                            <span className="mono" style={{ fontSize: '11px', fontWeight: '700', color: matchingInq.fpoQuote ? '#15803d' : '#b45309' }}>
                              {matchingInq.status}
                            </span>
                          </div>

                          {matchingInq.fpoQuote ? (
                            <div style={{ fontSize: '12px', color: '#166534' }}>
                              <div><strong>FPO Confirmed Supply Rate:</strong> <span className="mono" style={{ fontSize: '14px', fontWeight: '800', color: '#15803d' }}>₹{matchingInq.fpoQuote.pricePerKg}/kg</span> (Total: ₹{matchingInq.fpoQuote.totalAmount})</div>
                              <div style={{ fontStyle: 'italic', marginTop: '2px', color: '#14532d' }}>"{matchingInq.fpoQuote.packhouseNotes}"</div>
                              {matchingInq.selectedLogistics && (
                                <div style={{ marginTop: '4px', fontWeight: '700', color: '#0369a1' }}>
                                  🚚 Logistics Mode: {matchingInq.logisticsDetails?.provider} ({matchingInq.logisticsDetails?.trackingStatus})
                                </div>
                              )}
                            </div>
                          ) : (
                            <div style={{ fontSize: '12px', color: '#92400e' }}>
                              Inquiry sent to {matchingInq.targetFpoName} in {matchingInq.targetDistrict}, {matchingInq.targetState}. Awaiting FPO supply price quotation.
                            </div>
                          )}
                        </div>
                      )}

                      {/* Admin Multi-Step Workflow Actions */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
                        {/* 1. Broadcast availability inquiry */}
                        {!matchingInq && (
                          <button
                            className="btn-primary"
                            style={{ background: '#b45309', padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
                            onClick={() => handleOpenBroadcastModal(order, 'consumer')}
                          >
                            <Send size={13} />
                            <span>Broadcast Availability Inquiry to FPOs / Farmers</span>
                          </button>
                        )}

                        {/* 2. Review and approve FPO quotation */}
                        {matchingInq && matchingInq.fpoQuote && !matchingInq.adminApproved && (
                          <button
                            className="btn-primary"
                            style={{ background: '#15803d', padding: '6px 14px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}
                            onClick={() => handleApproveQuoteAndChooseLogistics(matchingInq)}
                          >
                            <Check size={14} />
                            <span>Approve FPO Quote (₹{matchingInq.fpoQuote.pricePerKg}/kg) & Select Logistics</span>
                          </button>
                        )}

                        {/* 3. Re-assign Logistics if already approved */}
                        {matchingInq && matchingInq.adminApproved && (
                          <button
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                            onClick={() => handleApproveQuoteAndChooseLogistics(matchingInq)}
                          >
                            <Truck size={13} />
                            <span>Manage / Update Logistics Fleet</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: FPO OPERATIONAL DOSSIER */}
      {/* ========================================================================= */}
      {selectedFpo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #14532d 0%, #166534 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
                  <Building2 size={13} />
                  <span>FPO OPERATIONAL DOSSIER · {selectedFpo.id}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px' }}>
                  {selectedFpo.name}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#bbf7d0', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span><MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedFpo.district}, {selectedFpo.state} ({selectedFpo.taluka})</span>
                  <span><Phone size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedFpo.phone}</span>
                  <span><Mail size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedFpo.email}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedFpo(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              
              {/* Key Capacity Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>CONNECTED SMALLHOLDERS</div>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>
                    {selectedFpo.farmers} Farmers
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>POOLED HARVEST CAPACITY</div>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>
                    {selectedFpo.pooledVolume}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>QUALITY CERTIFICATION</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {selectedFpo.verifiedGrade}
                  </div>
                </div>
              </div>

              {/* FPO Registration & Hub Details */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>FPO Governance & Facility Verification</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Registration Number:</strong> <span className="mono">{selectedFpo.regNo}</span></div>
                  <div><strong>Managing Director:</strong> {selectedFpo.directorName}</div>
                  <div><strong>State & District:</strong> {selectedFpo.state} &gt; {selectedFpo.district}</div>
                  <div><strong>Pincode:</strong> <span className="mono">{selectedFpo.pincode}</span></div>
                  <div><strong>Weighbridge Calibration:</strong> <span style={{ color: '#15803d', fontWeight: '700' }}>✓ Electronic Weighbridge Certified</span></div>
                  <div><strong>Active Cluster Requests:</strong> <span className="mono">{selectedFpo.activeRequests} Active Contracts</span></div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <strong>Registered Packhouse Address:</strong> {selectedFpo.address}
                </div>
              </div>

              {/* Primary Produce Specialization */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Primary Produce & Harvest Varieties</h4>
                <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dcfce7', fontSize: '13px', color: '#166534', fontWeight: '600' }}>
                  🌾 {selectedFpo.primaryCrops}
                </div>
              </div>

              {/* Direct Broadcast Option from FPO Dossier */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <button
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => {
                    handleOpenBroadcastModal({
                      id: `DIRECT-${Date.now().toString().slice(-4)}`,
                      name: `Direct Inquiry to ${selectedFpo.name}`,
                      crop: selectedFpo.primaryCrops.split(',')[0],
                      totalKg: 50,
                      totalCrates: 10,
                      city: `${selectedFpo.district} Cluster`
                    }, 'consumer');
                  }}
                >
                  📡 Send Availability Inquiry to this FPO
                </button>

                <button
                  className="btn-primary"
                  style={{ background: '#166534', padding: '8px 16px', fontSize: '13px' }}
                  onClick={() => alert(`FPO Audit Dossier for ${selectedFpo.name} is synchronized with state registry.`)}
                >
                  ✓ FPO Verified & Active
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: COMPANY / BULK BUYER DOSSIER */}
      {/* ========================================================================= */}
      {selectedCompany && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #0d2f1b 0%, #1e40af 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
                  <Users size={13} />
                  <span>CORPORATE BUYER AUDIT · {selectedCompany.id}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px' }}>
                  {selectedCompany.name}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#93c5fd', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span>{selectedCompany.type}</span>
                  <span>GSTIN: {selectedCompany.gstin}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompany(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>ESCROW DEPOSITED</div>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>
                    {selectedCompany.escrowDeposited}
                  </div>
                </div>

                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#0369a1', fontWeight: '700' }}>ACTIVE DEMAND</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0369a1', marginTop: '4px' }}>
                    {selectedCompany.activeDemand}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>MONTHLY VOLUME</div>
                  <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>
                    {selectedCompany.monthlyProcurementVolumeTonnes} Tonnes
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Corporate Procurement Specifications</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Headquarters:</strong> {selectedCompany.headquarters}</div>
                  <div><strong>Procurement Lead:</strong> {selectedCompany.procurementHead}</div>
                  <div><strong>Contact:</strong> {selectedCompany.phone} · {selectedCompany.email}</div>
                  <div><strong>Contract Terms:</strong> {selectedCompany.contractDuration}</div>
                  <div><strong>IoT Cold Chain Telemetry:</strong> <span style={{ color: '#0369a1', fontWeight: '700' }}>{selectedCompany.telemetryTracking}</span></div>
                  <div><strong>Matched FPO Hubs:</strong> {selectedCompany.matchedFPOs.join(', ')}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <button
                  className="btn-primary"
                  style={{ background: '#b45309', padding: '8px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => {
                    handleOpenBroadcastModal({
                      id: `COMP-DEM-${selectedCompany.id}`,
                      name: selectedCompany.name,
                      crop: selectedCompany.activeDemand,
                      totalKg: 100000,
                      totalCrates: 2000,
                      city: selectedCompany.city
                    }, 'company');
                  }}
                >
                  <Send size={14} />
                  <span>Broadcast {selectedCompany.name}'s Bulk Demand to FPO Clusters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: RURAL FARMER HARVEST & PAYOUT DOSSIER */}
      {/* ========================================================================= */}
      {selectedFarmer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
              color: '#ffffff',
              padding: '20px 24px',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '6px' }}>
                  <User size={13} />
                  <span>FARMER DIRECT HARVEST DOSSIER · {selectedFarmer.id}</span>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: '700', margin: '0 0 4px' }}>
                  {selectedFarmer.name}
                </h3>
                <div style={{ fontSize: '12.5px', color: '#fef3c7', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span><MapPin size={12} style={{ display: 'inline', marginRight: '3px' }} /> Village: {selectedFarmer.village}, {selectedFarmer.district}</span>
                  <span><Phone size={12} style={{ display: 'inline', marginRight: '3px' }} /> {selectedFarmer.phone}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedFarmer(null)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#b45309', fontWeight: '700' }}>HARVEST READY LOT</div>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#b45309' }}>
                    {selectedFarmer.harvestKg.toLocaleString()} kg
                  </div>
                  <div style={{ fontSize: '11px', color: '#78350f' }}>{selectedFarmer.crop}</div>
                </div>

                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>GUARANTEED BANK PAYOUT</div>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>
                    {selectedFarmer.bankPayout}
                  </div>
                  <div style={{ fontSize: '11px', color: '#166534' }}>{selectedFarmer.rateRealizationBonus}</div>
                </div>

                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                  <div style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>FPO AFFILIATION</div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
                    {selectedFarmer.fpoAffiliation}
                  </div>
                </div>
              </div>

              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px' }}>Farm-Gate Logistics & Direct Settlement</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12.5px' }}>
                  <div><strong>Land Holding:</strong> {selectedFarmer.landAcres} Acres</div>
                  <div><strong>Harvest Status:</strong> {selectedFarmer.readyDate}</div>
                  <div><strong>Bank Account / UPI:</strong> <span className="mono">{selectedFarmer.bankAccount}</span></div>
                  <div><strong>Pickup Status:</strong> {selectedFarmer.pickupStatus}</div>
                  <div><strong>Tech Accessibility:</strong> <span className="mono" style={{ color: '#b45309', fontWeight: '700' }}>{selectedFarmer.techStatus}</span></div>
                  <div><strong>Settlement Status:</strong> <span style={{ color: '#15803d', fontWeight: '700' }}>{selectedFarmer.status}</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <span style={{ fontSize: '13px', color: '#15803d', fontWeight: '700', padding: '8px' }}>
                  ✓ Payout Released to Farmer Bank Account
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: BROADCAST AVAILABILITY INQUIRY TO STATE & DISTRICT FPOS/FARMERS */}
      {/* ========================================================================= */}
      {broadcastModalOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #7c2d12 0%, #b45309 100%)',
              color: '#ffffff',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={18} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  Broadcast Availability Inquiry to FPO / Farmers
                </h3>
              </div>
              <button
                onClick={() => setBroadcastModalOrder(null)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSendBroadcastInquiry} style={{ padding: '24px' }}>
              
              {/* Requirement Summary Box */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px', marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Demand Specifications:
                </div>
                <div style={{ fontSize: '13.5px', color: '#0f172a' }}>
                  <strong>Requester:</strong> {broadcastModalOrder.consumerName || broadcastModalOrder.name || broadcastModalOrder.companyName}
                </div>
                <div style={{ fontSize: '13.5px', color: '#0f172a', marginTop: '2px' }}>
                  <strong>Produce & Quantity:</strong> <span className="mono" style={{ color: '#0284c7', fontWeight: '800' }}>{broadcastModalOrder.totalKg ? `${broadcastModalOrder.totalKg} kg (${broadcastModalOrder.totalCrates} crates)` : (broadcastModalOrder.activeDemand || 'Bulk Order')}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                  <strong>Destination:</strong> {broadcastModalOrder.deliveryAddress || broadcastModalOrder.city || broadcastModalOrder.address}
                </div>
              </div>

              {/* State & District Target Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '12px' }}>Target State</label>
                  <select 
                    className="form-select"
                    value={broadcastTargetState}
                    onChange={(e) => {
                      setBroadcastTargetState(e.target.value);
                      const stateFpos = fposList.filter(f => f.state === e.target.value);
                      if (stateFpos.length > 0) {
                        setBroadcastTargetDistrict(stateFpos[0].district);
                        setBroadcastSelectedFpoId(stateFpos[0].id);
                      }
                    }}
                  >
                    {availableStates.filter(s => s !== 'All').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: '12px' }}>Target District</label>
                  <select 
                    className="form-select"
                    value={broadcastTargetDistrict}
                    onChange={(e) => {
                      setBroadcastTargetDistrict(e.target.value);
                      const distFpos = fposList.filter(f => f.state === broadcastTargetState && f.district === e.target.value);
                      if (distFpos.length > 0) {
                        setBroadcastSelectedFpoId(distFpos[0].id);
                      }
                    }}
                  >
                    {Array.from(new Set(fposList.filter(f => f.state === broadcastTargetState).map(f => f.district))).map(d => (
                      <option key={d} value={d}>{d} District</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target FPO Selection */}
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Choose Target FPO Aggregator</label>
                <select
                  className="form-select"
                  value={broadcastSelectedFpoId}
                  onChange={(e) => setBroadcastSelectedFpoId(e.target.value)}
                >
                  {fposList
                    .filter(f => f.state === broadcastTargetState && f.district === broadcastTargetDistrict)
                    .map(f => (
                      <option key={f.id} value={f.id}>
                        {f.name} (Capacity: {f.pooledVolume} · {f.farmers} Farmers)
                      </option>
                    ))}
                </select>
              </div>

              {/* Custom Inquiry Note */}
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label className="form-label" style={{ fontSize: '12px' }}>Inquiry Message to FPO Packhouse</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="e.g. Please confirm if Grade-A supply is ready in your aggregation shed and submit your supply price per kg."
                  value={broadcastCustomNote}
                  onChange={(e) => setBroadcastCustomNote(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setBroadcastModalOrder(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ background: '#7c2d12', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Send size={14} />
                  <span>Send Availability & Quotation Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: LOGISTICS MODE SELECTION & HANDOVER MODAL */}
      {/* ========================================================================= */}
      {logisticsModalInquiry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1200,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '720px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #14532d 0%, #15803d 100%)',
              color: '#ffffff',
              padding: '18px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  Approve Quotation & Configure Logistics Handover
                </h3>
              </div>
              <button
                onClick={() => setLogisticsModalInquiry(null)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmLogistics} style={{ padding: '24px' }}>
              
              {/* Approved Price Quote Card */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '10px',
                padding: '16px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700', textTransform: 'uppercase' }}>
                    FPO Confirmed Availability & Price:
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#14532d', marginTop: '2px' }}>
                    {logisticsModalInquiry.targetFpoName} ({logisticsModalInquiry.targetDistrict})
                  </div>
                  <div style={{ fontSize: '12px', color: '#166534', marginTop: '2px' }}>
                    Order: {logisticsModalInquiry.quantity} of {logisticsModalInquiry.crop}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ fontSize: '22px', fontWeight: '800', color: '#15803d' }}>
                    ₹{logisticsModalInquiry.fpoQuote?.pricePerKg || 22.50} / kg
                  </div>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '600' }}>
                    Total: ₹{logisticsModalInquiry.fpoQuote?.totalAmount || 270}
                  </div>
                </div>
              </div>

              {/* 3 Logistics Options Selection */}
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
                Select Logistics Fulfillment Model:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                
                {/* Option 1: FPO Direct Delivery */}
                <label 
                  style={{
                    border: selectedLogisticsOption === 'fpo_direct' ? '2px solid #166534' : '1px solid #e2e8f0',
                    background: selectedLogisticsOption === 'fpo_direct' ? '#f0fdf4' : '#ffffff',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="logistics"
                    value="fpo_direct"
                    checked={selectedLogisticsOption === 'fpo_direct'}
                    onChange={() => setSelectedLogisticsOption('fpo_direct')}
                    style={{ marginTop: '3px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>1. FPO / Farmer Direct Delivery (Seller-Managed)</strong>
                      <span className="mono" style={{ fontSize: '12px', color: '#166534', fontWeight: '700' }}>₹1.80 / kg</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0', lineHeight: '1.4' }}>
                      The FPO uses their local tractor/pickup van fleet to transport produce directly to the buyer/consumer destination.
                    </p>
                  </div>
                </label>

                {/* Option 2: Buyer / Consumer Self-Pickup */}
                <label 
                  style={{
                    border: selectedLogisticsOption === 'buyer_pickup' ? '2px solid #166534' : '1px solid #e2e8f0',
                    background: selectedLogisticsOption === 'buyer_pickup' ? '#f0fdf4' : '#ffffff',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="logistics"
                    value="buyer_pickup"
                    checked={selectedLogisticsOption === 'buyer_pickup'}
                    onChange={() => setSelectedLogisticsOption('buyer_pickup')}
                    style={{ marginTop: '3px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13.5px', color: '#0f172a' }}>2. Buyer / Consumer Self-Pickup (Packhouse Gate)</strong>
                      <span className="mono" style={{ fontSize: '12px', color: '#15803d', fontWeight: '700' }}>₹0.00 Free</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0', lineHeight: '1.4' }}>
                      The buyer/consumer dispatches their own vehicle with a digital QR gate pass to collect directly at the aggregation shed.
                    </p>
                  </div>
                </label>

                {/* Option 3: Platform Smart 3PL (Recommended) */}
                <label 
                  style={{
                    border: selectedLogisticsOption === 'platform_3pl' ? '2px solid #0284c7' : '1px solid #e2e8f0',
                    background: selectedLogisticsOption === 'platform_3pl' ? '#f0f9ff' : '#ffffff',
                    borderRadius: '10px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input
                    type="radio"
                    name="logistics"
                    value="platform_3pl"
                    checked={selectedLogisticsOption === 'platform_3pl'}
                    onChange={() => setSelectedLogisticsOption('platform_3pl')}
                    style={{ marginTop: '3px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '13.5px', color: '#0369a1' }}>3. KisanSetu AI Smart 3PL & Cold-Chain Route</strong>
                        <span style={{ fontSize: '10px', background: '#0284c7', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>RECOMMENDED</span>
                      </div>
                      <span className="mono" style={{ fontSize: '12px', color: '#0284c7', fontWeight: '700' }}>₹3.20 / kg</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '4px 0 0', lineHeight: '1.4' }}>
                      Automated temperature-controlled reefer dispatch with live GPS tracking, transit damage insurance, and guaranteed same-day delivery.
                    </p>
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" className="btn-secondary" onClick={() => setLogisticsModalInquiry(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ background: '#166534', padding: '8px 18px', fontSize: '13px' }}>
                  ✓ Confirm Quotation & Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
