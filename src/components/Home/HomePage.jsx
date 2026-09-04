import React, { useState } from 'react';
import { 
  Leaf, 
  Building2, 
  UserCheck, 
  User, 
  ShoppingCart, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Smartphone, 
  Layers, 
  DollarSign,
  Languages,
  ChevronRight,
  LogIn,
  UserPlus
} from 'lucide-react';
import { PRESET_ACCOUNTS, MASTER_ADMIN_DATA, I18N_STRINGS, SDG_IMPACT_GOALS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function HomePage({ onLogin, currentLang, setCurrentLang }) {
  const [selectedRole, setSelectedRole] = useState('fpo'); // 'fpo', 'farmer', 'company', 'consumer', 'admin'
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register'
  
  // Custom Form state
  const [signInContact, setSignInContact] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');
  const [customName, setCustomName] = useState('');
  const [customContact, setCustomContact] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [customPassword, setCustomPassword] = useState('');

  const t = I18N_STRINGS[currentLang] || I18N_STRINGS.en;

  const roleConfigs = {
    fpo: {
      id: 'fpo',
      title: 'Farmer Producer Org (FPO)',
      shortTitle: 'FPO Portal',
      subtitle: 'Aggregate harvest from smallholders, pool volume, accept corporate bulk bids, and distribute escrow earnings.',
      icon: UserCheck,
      color: '#166534',
      badge: 'Aggregator Hub',
      preset: PRESET_ACCOUNTS.find(a => a.role === 'fpo'),
      fieldLabel: 'FPO CIN / Reg Number',
      fieldPlaceholder: 'e.g. FPO-MH-2021-0089',
      benefits: ['Pool multi-farm crops', 'Direct bulk buyer bids', 'Automated escrow payout to farmers']
    },
    farmer: {
      id: 'farmer',
      title: 'Individual Farmer Direct',
      shortTitle: 'Farmer Portal',
      subtitle: 'List crop harvests, get guaranteed farm-gate rates (+₹5.80/kg over mandi), and receive direct bank payouts.',
      icon: User,
      color: '#b45309',
      badge: 'Farm Producer',
      preset: PRESET_ACCOUNTS.find(a => a.role === 'farmer'),
      fieldLabel: 'Land Size (Acres) / Primary Crop',
      fieldPlaceholder: 'e.g. 4.5 Acres · Tomatoes & Onions',
      benefits: ['Guaranteed MSP / fair rate', 'Direct UPI / NEFT transfer', 'Offline GSM SMS / WhatsApp alerts']
    },
    company: {
      id: 'company',
      title: 'Company / Enterprise Buyer',
      shortTitle: 'Company B2B',
      subtitle: 'Post large-scale procurement demands (10t–500t), auto-match with verified FPO clusters, and monitor reefer transit.',
      icon: Building2,
      color: '#0d2f1b',
      badge: 'Bulk Procurement',
      preset: PRESET_ACCOUNTS.find(a => a.role === 'company'),
      fieldLabel: 'Company GSTIN / CIN',
      fieldPlaceholder: 'e.g. 27AAACF1234F1Z8',
      benefits: ['Multi-FPO pool aggregation', 'Locked escrow contracts', 'Real-time temperature IoT tracking']
    },
    consumer: {
      id: 'consumer',
      title: 'Retail Consumer / Household',
      shortTitle: 'Consumer Market',
      subtitle: 'Buy fresh farm produce crates directly from verified FPOs at 25–30% lower prices than supermarkets.',
      icon: ShoppingCart,
      color: '#0284c7',
      badge: 'Farm-to-Fork',
      preset: PRESET_ACCOUNTS.find(a => a.role === 'consumer'),
      fieldLabel: 'Delivery Pincode / City',
      fieldPlaceholder: 'e.g. 400053 (Andheri West, Mumbai)',
      benefits: ['25-30% lower than market', 'Harvested within 24 hours', '100% Farm-origin verified']
    },
    admin: {
      id: 'admin',
      title: 'Master Platform Administrator',
      shortTitle: 'Master Admin',
      subtitle: 'Full 360-degree governance and real-time oversight over all FPOs, Companies, Farmers, Consumers, and GMV.',
      icon: ShieldAlert,
      color: '#7c2d12',
      badge: 'Master Control',
      preset: PRESET_ACCOUNTS.find(a => a.role === 'admin'),
      fieldLabel: 'Master Security Key',
      fieldPlaceholder: 'Enter 6-digit Master Passcode (Demo: 999999)',
      benefits: ['Unrestricted stakeholder access', 'Verify FPOs & Company bids', 'Monitor escrow & platform GMV']
    }
  };

  const activeConfig = roleConfigs[selectedRole];

  // Handle Role Change
  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'admin') {
      setAuthMode('signin');
    }
  };

  // Handle Existing User Sign In
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === 'admin') {
      const emailEntered = adminEmail.trim() || activeConfig.preset.email;
      const adminAccount = {
        ...activeConfig.preset,
        email: emailEntered,
        name: emailEntered.includes('@') ? (emailEntered.split('@')[0].toUpperCase()) : 'Super Admin'
      };
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      onLogin(adminAccount);
      return;
    }

    const contactVal = signInContact.trim() || activeConfig.preset.phone;
    const userAccount = {
      ...activeConfig.preset,
      phone: contactVal.includes('@') ? '+91 98000-00000' : contactVal,
      email: contactVal.includes('@') ? contactVal : activeConfig.preset.email
    };

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    onLogin(userAccount);
  };

  // Handle New User Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const finalName = customName.trim() || activeConfig.preset.name;
    const customUser = {
      id: `usr-${selectedRole}-${Date.now()}`,
      name: finalName,
      role: selectedRole,
      roleLabel: activeConfig.title,
      email: customContact.includes('@') ? customContact : `${finalName.toLowerCase().replace(/\s+/g, '')}@krishisetu.in`,
      phone: customContact.includes('@') ? '+91 98000-00000' : (customContact || '+91 98XXX-XXXXX'),
      location: customLocation || 'Maharashtra, India',
      avatar: finalName.charAt(0).toUpperCase(),
      badgeColor: activeConfig.color,
      customDetail: customSpecific || activeConfig.fieldPlaceholder
    };

    confetti({ particleCount: 80, spread: 85, origin: { y: 0.6 } });
    onLogin(customUser);
  };

  const cycleLang = () => {
    if (currentLang === 'en') setCurrentLang('hi');
    else if (currentLang === 'hi') setCurrentLang('mr');
    else setCurrentLang('en');
  };

  const getLangLabel = () => {
    if (currentLang === 'en') return 'हिन्दी';
    if (currentLang === 'hi') return 'मराठी';
    return 'English';
  };

  return (
    <div className="homepage-container" style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      
      {/* 1. Public Top Navigation Bar */}
      <header style={{
        background: '#0d2f1b',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '14px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 20px rgba(13, 47, 27, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
          }}>
            <Leaf size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>
                KisanSetu
              </span>
              <span className="mono" style={{ fontSize: '9.5px', background: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', padding: '2px 6px', borderRadius: '4px', fontWeight: '700' }}>
                DEMAND-DRIVEN AGRI OS
              </span>
            </div>
            <div style={{ fontSize: '11px', color: '#a7f3d0' }}>
              Direct Agri-Marketplace & Supply Infrastructure
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a href="#login-portal" style={{ color: '#d1fae5', textDecoration: 'none', fontSize: '13.5px', fontWeight: '600' }}>5 Login Portals</a>
          <a href="#how-it-works" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '13.5px', fontWeight: '500' }}>How It Works</a>
          <a href="#impact" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '13.5px', fontWeight: '500' }}>Farmer Realization</a>
          <a href="#logistics" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '13.5px', fontWeight: '500' }}>Smart Cold-Chain</a>
        </nav>

        {/* Right CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={cycleLang}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Languages size={14} />
            <span>{getLangLabel()}</span>
          </button>

          <a
            href="#login-portal"
            className="btn-primary"
            style={{
              background: '#22c55e',
              color: '#062814',
              fontWeight: '700',
              padding: '8px 18px',
              fontSize: '13px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogIn size={15} />
            <span>Sign In / Register</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Section with Live Impact */}
      <section style={{
        background: 'linear-gradient(180deg, #0d2f1b 0%, #134e2a 100%)',
        color: '#ffffff',
        padding: '50px 40px 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#6ee7b7', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '16px' }}>
              <Sparkles size={13} />
              <span>ELIMINATING 4-6 MIDDLEMEN LAYERS</span>
            </div>

            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '42px', fontWeight: '800', lineHeight: '1.15', margin: '0 0 16px', letterSpacing: '-0.8px' }}>
              Direct Agri-Marketplace Connecting <span style={{ color: '#4ade80' }}>Farmers & FPOs</span> with Companies & Consumers
            </h1>

            <p style={{ fontSize: '16px', color: '#d1fae5', lineHeight: '1.5', margin: '0 0 28px', maxWidth: '580px' }}>
              Demand-driven procurement infrastructure that delivers <strong>+₹5.80/kg higher earnings</strong> for farmers, <strong>25–30% lower prices</strong> for consumers, and AI-optimized cold chain logistics.
            </p>

            {/* Quick Metrics Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', maxWidth: '540px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#86efac' }}>FARMER REALIZATION</div>
                <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>₹23.80/kg</div>
                <div style={{ fontSize: '10.5px', color: '#a7f3d0' }}>vs ₹18.00 APMC Mandi</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#86efac' }}>CONSUMER SAVINGS</div>
                <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>-26%</div>
                <div style={{ fontSize: '10.5px', color: '#a7f3d0' }}>Direct Farm-to-Fork</div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px 14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', color: '#86efac' }}>TOTAL PLATFORM GMV</div>
                <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>₹4.82 Cr</div>
                <div style={{ fontSize: '10.5px', color: '#a7f3d0' }}>100% Escrow Protected</div>
              </div>
            </div>
          </div>

          {/* Quick Stakeholder Overview Cards */}
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span className="mono" style={{ fontSize: '11px', color: '#86efac', fontWeight: '700' }}>
                LIVE PLATFORM NETWORK
              </span>
              <span style={{ fontSize: '11px', color: '#ffffff', background: '#15803d', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
                5 Verified Roles
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.values(roleConfigs).map((cfg) => {
                const Icon = cfg.icon;
                return (
                  <div
                    key={cfg.id}
                    onClick={() => {
                      setSelectedRole(cfg.id);
                      document.getElementById('login-portal')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: cfg.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff' }}>{cfg.title}</div>
                        <div style={{ fontSize: '11px', color: '#a7f3d0' }}>{cfg.badge}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: '600' }}>
                      Enter Portal <ChevronRight size={14} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dedicated 5-Role Sign In & Registration Hub */}
      <section id="login-portal" style={{ padding: '60px 40px', maxWidth: '1140px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="mono" style={{ fontSize: '11.5px', fontWeight: '700', color: '#166534', background: '#dcfce7', padding: '4px 12px', borderRadius: '20px' }}>
            UNIFIED ACCESS GATEWAY
          </span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '32px', fontWeight: '800', color: '#0f172a', margin: '8px 0 6px' }}>
            Choose Your Stakeholder Portal to Sign In or Register
          </h2>
          <p style={{ fontSize: '14px', color: '#64748b' }}>
            Select your role to access your dedicated supply, demand, storefront, or governance workspace.
          </p>
        </div>

        {/* 5 Distinct Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          background: '#ffffff',
          borderRadius: '12px',
          padding: '6px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          marginBottom: '24px'
        }}>
          {Object.values(roleConfigs).map((cfg) => {
            const Icon = cfg.icon;
            const isTabActive = selectedRole === cfg.id;
            return (
              <button
                key={cfg.id}
                onClick={() => handleRoleChange(cfg.id)}
                style={{
                  padding: '14px 8px',
                  border: 'none',
                  background: isTabActive ? cfg.color : 'transparent',
                  color: isTabActive ? '#ffffff' : '#475569',
                  borderRadius: '8px',
                  fontWeight: isTabActive ? '700' : '600',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={18} />
                <span>{cfg.shortTitle}</span>
              </button>
            );
          })}
        </div>

        {/* Role Portal Login / Registration Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr'
        }}>
          {/* Left Info Column */}
          <div style={{
            background: `linear-gradient(135deg, ${activeConfig.color}10 0%, #ffffff 100%)`,
            borderRight: '1px solid #e2e8f0',
            padding: '36px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: activeConfig.color,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <activeConfig.icon size={22} />
              </div>
              <div>
                <span className="mono" style={{ fontSize: '10px', color: activeConfig.color, fontWeight: '700', textTransform: 'uppercase' }}>
                  {activeConfig.badge}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                  {activeConfig.title}
                </h3>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.5', marginBottom: '24px' }}>
              {activeConfig.subtitle}
            </p>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '18px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '12px' }}>
                Key Workspace Capabilities:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeConfig.benefits.map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13.5px', color: '#1e293b' }}>
                    <CheckCircle2 size={16} color={activeConfig.color} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sign In or Register */}
          <div style={{ padding: '36px' }}>
            {selectedRole !== 'admin' ? (
              <div>
                {/* 2-Option Mode Switcher: Sign In vs Register */}
                <div style={{
                  display: 'flex',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  padding: '4px',
                  marginBottom: '20px'
                }}>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signin')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: 'none',
                      borderRadius: '6px',
                      background: authMode === 'signin' ? '#ffffff' : 'transparent',
                      color: authMode === 'signin' ? activeConfig.color : '#64748b',
                      fontWeight: authMode === 'signin' ? '700' : '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: authMode === 'signin' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <LogIn size={15} />
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    style={{
                      flex: 1,
                      padding: '8px',
                      border: 'none',
                      borderRadius: '6px',
                      background: authMode === 'register' ? '#ffffff' : 'transparent',
                      color: authMode === 'register' ? activeConfig.color : '#64748b',
                      fontWeight: authMode === 'register' ? '700' : '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: authMode === 'register' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <UserPlus size={15} />
                    <span>Register / Sign Up</span>
                  </button>
                </div>

                {/* Mode 1: Sign In for Existing User */}
                {authMode === 'signin' ? (
                  <form onSubmit={handleSignInSubmit}>
                    <div style={{ marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>
                        Sign In to {activeConfig.shortTitle}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        Enter your registered mobile number or email address:
                      </p>
                    </div>

                    <div className="form-group" style={{ marginBottom: '14px' }}>
                      <label className="form-label">Registered Mobile Number or Email</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="+91 98XXX-XXXXX or email"
                        value={signInContact}
                        onChange={(e) => setSignInContact(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '18px' }}>
                      <label className="form-label">Password / OTP Security Code</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="••••••••"
                        value={signInPassword}
                        onChange={(e) => setSignInPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        background: activeConfig.color,
                        width: '100%',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '13.5px'
                      }}
                    >
                      <span>Sign In to {activeConfig.shortTitle} Workspace</span>
                      <ArrowRight size={15} />
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12.5px', color: '#64748b' }}>
                      New to KisanSetu?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('register')}
                        style={{ background: 'none', border: 'none', color: activeConfig.color, fontWeight: '700', cursor: 'pointer', padding: 0 }}
                      >
                        Register Here
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Mode 2: Registration for New User */
                  <form onSubmit={handleRegisterSubmit}>
                    <div style={{ marginBottom: '14px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>
                        Register New {activeConfig.shortTitle}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                        Create a verified stakeholder account on KisanSetu:
                      </p>
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Full Name / Entity Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder={selectedRole === 'company' ? 'e.g. Reliance Fresh Ltd.' : selectedRole === 'fpo' ? 'e.g. Sahyadri Bio FPO' : 'e.g. Rameshwar Patil'}
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Mobile Number or Email</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="+91 98XXX-XXXXX or email"
                        value={customContact}
                        onChange={(e) => setCustomContact(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Location / District / City</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. Nashik, Maharashtra"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '16px' }}>
                      <label className="form-label">Create Password / Security PIN</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Create a secure password"
                        value={customPassword}
                        onChange={(e) => setCustomPassword(e.target.value)}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary"
                      style={{
                        background: activeConfig.color,
                        width: '100%',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '13.5px'
                      }}
                    >
                      <span>Complete Registration & Enter</span>
                      <ArrowRight size={15} />
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '14px', fontSize: '12.5px', color: '#64748b' }}>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        style={{ background: 'none', border: 'none', color: activeConfig.color, fontWeight: '700', cursor: 'pointer', padding: 0 }}
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Master Admin: ONLY SIGN IN (NO REGISTRATION) */
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '800', color: '#7c2d12', margin: '0 0 4px' }}>
                    Super Admin Master Authentication
                  </h4>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                    Restricted to platform administrators with Master Key credentials:
                  </p>
                </div>

                <form onSubmit={handleSignInSubmit}>
                  <div className="form-group" style={{ marginBottom: '14px' }}>
                    <label className="form-label">Administrator Official Email / ID</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. admin@krishisetu.gov.in"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Master Security Passcode</label>
                    <input
                      type="password"
                      className="form-input"
                      placeholder="Enter Master Passcode (Demo: 999999)"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      background: '#7c2d12',
                      width: '100%',
                      padding: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontSize: '13.5px'
                    }}
                  >
                    <span>Authenticate & Access Master Control</span>
                    <ArrowRight size={15} />
                  </button>

                  <div style={{ marginTop: '14px', fontSize: '11.5px', color: '#94a3b8', textAlign: 'center', lineHeight: '1.4' }}>
                    Registration is disabled for administrative roles. Designated single master controller credentials only.
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Core Capabilities Showcase */}
      <section id="how-it-works" style={{ background: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '60px 40px' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="mono" style={{ fontSize: '11.5px', fontWeight: '700', color: '#166534', background: '#dcfce7', padding: '4px 12px', borderRadius: '20px' }}>
              HOW KISANSETU WORKS
            </span>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '30px', fontWeight: '800', color: '#0f172a', margin: '8px 0 6px' }}>
              End-to-End Agri-Supply Chain Infrastructure
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              Designed for transparency, direct escrow settlement, and real-time cold chain efficiency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '40px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#dcfce7', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Layers size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>1. AI Demand & FPO Aggregation</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Bulk buyers broadcast demand (e.g. 100t tomatoes). KisanSetu's AI matches and pools multiple smallholder FPOs into a single verified contract.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <Truck size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>2. 3-Tier Logistics & Cold-Chain</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Support for Seller delivery, Buyer pickup, or Platform Smart 3PL with live IoT temperature monitoring (11.4 °C) and AI route optimization.
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <DollarSign size={20} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>3. Direct Escrow Payouts</h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5' }}>
                Escrow locks buyer funds upfront and automatically credits individual farmer bank accounts via UPI/NEFT upon receiving weighbridge confirmation.
              </p>
            </div>
          </div>

          {/* UN SDG Impact Alignment Section on HomePage */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
            border: '1px solid #bbf7d0',
            borderRadius: '16px',
            padding: '30px',
            marginTop: '10px'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span className="mono" style={{ fontSize: '11px', fontWeight: '700', color: '#166534', background: '#dcfce7', padding: '3px 10px', borderRadius: '20px' }}>
                UNITED NATIONS SUSTAINABLE DEVELOPMENT GOALS
              </span>
              <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '6px 0 4px' }}>
                KisanSetu UN SDG Impact Matrix
              </h3>
              <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>
                Driving quantifiable socioeconomic transformation across rural India:
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px' }}>
              {SDG_IMPACT_GOALS.map((sdg) => (
                <div key={sdg.sdgNumber} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderTop: `4px solid ${sdg.color}`, borderRadius: '10px', padding: '14px' }}>
                  <div className="mono" style={{ fontSize: '11.5px', fontWeight: '800', color: sdg.color, marginBottom: '4px' }}>
                    SDG {sdg.sdgNumber}
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>
                    {sdg.title}
                  </h4>
                  <div className="mono" style={{ fontSize: '11px', fontWeight: '700', color: sdg.color, background: `${sdg.color}15`, padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '4px' }}>
                    {sdg.quantifiableMetric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer style={{ background: '#0a2314', color: '#a7f3d0', padding: '40px 40px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1140px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Leaf size={20} color="#4ade80" />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>
              KisanSetu
            </span>
            <span style={{ fontSize: '12px', color: '#86efac' }}>· Direct Agri-OS</span>
          </div>

          <div style={{ display: 'flex', gap: '18px', fontSize: '12.5px' }}>
            <a href="#login-portal" onClick={() => setSelectedRole('fpo')} style={{ color: '#d1fae5', textDecoration: 'none' }}>FPO Hub</a>
            <a href="#login-portal" onClick={() => setSelectedRole('farmer')} style={{ color: '#d1fae5', textDecoration: 'none' }}>Farmer Portal</a>
            <a href="#login-portal" onClick={() => setSelectedRole('company')} style={{ color: '#d1fae5', textDecoration: 'none' }}>Company B2B</a>
            <a href="#login-portal" onClick={() => setSelectedRole('consumer')} style={{ color: '#d1fae5', textDecoration: 'none' }}>Consumer Market</a>
            <a href="#login-portal" onClick={() => setSelectedRole('admin')} style={{ color: '#d1fae5', textDecoration: 'none' }}>Super Admin</a>
          </div>
        </div>

        <div style={{ maxWidth: '1140px', margin: '16px auto 0', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#6ee7b7' }}>
          <span>© 2026 KisanSetu Procurement OS. All rights reserved.</span>
          <span>Zero-Middleman Agri Infrastructure · Smart India Hackathon</span>
        </div>
      </footer>
    </div>
  );
}
