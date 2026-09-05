import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  UserCheck, 
  User, 
  ShoppingCart, 
  ShieldAlert, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  Mail,
  Leaf,
  CheckCircle2,
  Sparkles,
  UserPlus,
  LogIn,
  Send
} from 'lucide-react';
import { PRESET_ACCOUNTS } from '../../data/mockData';
import { registerNewUser, authenticateUser } from '../../lib/authService';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onLogin, currentUser }) {
  if (!isOpen) return null;

  const [activeRoleTab, setActiveRoleTab] = useState('fpo'); // 'fpo', 'farmer', 'company', 'consumer', 'admin'
  const [formMode, setFormMode] = useState('register'); // default to 'register' to allow instant signup
  
  // Registration form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Nashik, Maharashtra');
  const [roleSpecificField, setRoleSpecificField] = useState('');
  const [otpCode, setOtpCode] = useState('582194');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  // Sign In form fields
  const [signInIdentifier, setSignInIdentifier] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const roleConfigs = {
    fpo: {
      id: 'fpo',
      title: "Farmer Producer Org (FPO)",
      subtitle: "Aggregate member farmers, manage harvest pools, accept bulk buyer bids, and distribute earnings.",
      icon: UserCheck,
      color: "#166534",
      bgLight: "#f0fdf4",
      roleSpecificLabel: "FPO Registration / Cooperative CIN",
      roleSpecificPlaceholder: "e.g. FPO-MH-2021-0089",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'fpo')
    },
    farmer: {
      id: 'farmer',
      title: "Individual Farmer",
      subtitle: "List your harvests, view guaranteed farm-gate rates, receive direct bank payouts, and get SMS alerts.",
      icon: User,
      color: "#b45309",
      bgLight: "#fffbeb",
      roleSpecificLabel: "Land Size (Acres) / Primary Crop",
      roleSpecificPlaceholder: "e.g. 4.5 Acres · Tomatoes & Onions",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'farmer')
    },
    company: {
      id: 'company',
      title: "Company / Bulk Buyer",
      subtitle: "Post large-volume procurement requirements (10t - 500t), match with verified FPOs, and lock escrow contracts.",
      icon: Building2,
      color: "#0d2f1b",
      bgLight: "#f4f8f4",
      roleSpecificLabel: "Company GSTIN / Corporate CIN",
      roleSpecificPlaceholder: "e.g. 27AAACF1234F1Z8",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'company')
    },
    consumer: {
      id: 'consumer',
      title: "Retail Consumer / Household",
      subtitle: "Buy fresh farm-gate produce crates directly from FPOs at 25-30% lower prices than supermarkets.",
      icon: ShoppingCart,
      color: "#0284c7",
      bgLight: "#f0f9ff",
      roleSpecificLabel: "Delivery Address / City Pincode",
      roleSpecificPlaceholder: "e.g. Flat 402, Andheri West, Mumbai 400053",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'consumer')
    },
    admin: {
      id: 'admin',
      title: "Platform Administrator",
      subtitle: "Master governance oversight over all FPOs, Companies, Farmers, Consumers, GMV, Escrow, and Logistics.",
      icon: ShieldAlert,
      color: "#7c2d12",
      bgLight: "#fef2f2",
      roleSpecificLabel: "Super Admin Master Passcode",
      roleSpecificPlaceholder: "Enter 6-digit Master Key (Demo: 999999)",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'admin')
    }
  };

  const currentConfig = roleConfigs[activeRoleTab];

  // Quick 1-Click Preset Demo Login
  const handle1ClickLogin = (presetAccount) => {
    onLogin(presetAccount);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    onClose();
  };

  // Handle Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (!name.trim()) {
      setAuthError('Please enter your full name or entity name.');
      return;
    }
    if (!phone.trim()) {
      setAuthError('Please enter a valid mobile number to receive SMS alerts.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await registerNewUser({
        name,
        phone,
        email,
        role: activeRoleTab,
        roleLabel: currentConfig.title,
        location,
        customDetail: roleSpecificField || currentConfig.roleSpecificPlaceholder,
        password
      });

      confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
      onLogin(newUser);
      onClose();
    } catch (err) {
      console.error('Registration failed:', err);
      setAuthError('Registration encountered an issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setAuthError('');
    const id = signInIdentifier.trim() || currentConfig.preset.phone;
    const authResult = authenticateUser({
      identifier: id,
      password: signInPassword,
      role: activeRoleTab
    });

    if (authResult.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onLogin(authResult.user);
      onClose();
    } else {
      setAuthError('Account not found. You can register a new account in 10 seconds.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#0d2f1b', color: '#ffffff', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#1e5e36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55efc4' }}>
              <Leaf size={20} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: '10.5px', color: '#68d391', letterSpacing: '0.8px' }}>
                KISANSETU DIRECT AGRI-OS
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', margin: 0 }}>
                {formMode === 'register' ? 'Register New Stakeholder Account' : 'Sign In to Workspace'}
              </h3>
            </div>
          </div>
          <button className="modal-close-btn" style={{ color: '#a7f3d0' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* 2-Option Mode Switcher: Sign In vs Register */}
        <div style={{
          display: 'flex',
          background: '#f8fafc',
          padding: '8px 16px 0',
          borderBottom: '1px solid #e2e8f0',
          gap: '8px'
        }}>
          <button
            type="button"
            onClick={() => setFormMode('signin')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              background: formMode === 'signin' ? '#ffffff' : 'transparent',
              color: formMode === 'signin' ? '#15803d' : '#64748b',
              fontWeight: formMode === 'signin' ? '800' : '600',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderBottom: formMode === 'signin' ? '2px solid #15803d' : 'none'
            }}
          >
            <LogIn size={16} />
            <span>Sign In to Existing Account</span>
          </button>

          <button
            type="button"
            onClick={() => setFormMode('register')}
            style={{
              flex: 1,
              padding: '10px',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              background: formMode === 'register' ? '#ffffff' : 'transparent',
              color: formMode === 'register' ? '#15803d' : '#64748b',
              fontWeight: formMode === 'register' ? '800' : '600',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              borderBottom: formMode === 'register' ? '2px solid #15803d' : 'none'
            }}
          >
            <UserPlus size={16} />
            <span>Register New Stakeholder (Free)</span>
          </button>
        </div>

        {/* 5 Distinct Role Selection Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          background: '#f1f5f9',
          borderBottom: '1px solid #e2e8f0',
          padding: '6px 6px 0'
        }}>
          {Object.values(roleConfigs).map((cfg) => {
            const Icon = cfg.icon;
            const isTabActive = activeRoleTab === cfg.id;
            return (
              <button
                key={cfg.id}
                type="button"
                onClick={() => setActiveRoleTab(cfg.id)}
                style={{
                  padding: '10px 4px',
                  border: 'none',
                  background: isTabActive ? '#ffffff' : 'transparent',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  fontWeight: isTabActive ? '700' : '600',
                  color: isTabActive ? cfg.color : '#64748b',
                  cursor: 'pointer',
                  fontSize: '11.5px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: isTabActive ? '0 -2px 6px rgba(0,0,0,0.05)' : 'none',
                  borderBottom: isTabActive ? `2px solid ${cfg.color}` : 'none'
                }}
              >
                <Icon size={16} color={isTabActive ? cfg.color : '#64748b'} />
                <span>{cfg.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>

        <div className="modal-body" style={{ padding: '20px 24px' }}>
          {/* Active Role Banner Description */}
          <div style={{
            background: currentConfig.bgLight,
            border: `1px solid ${currentConfig.color}30`,
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: currentConfig.color,
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <currentConfig.icon size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: currentConfig.color, margin: 0 }}>
                {currentConfig.title} Portal
              </h4>
              <p style={{ fontSize: '12px', color: '#475569', margin: '2px 0 0', lineHeight: '1.4' }}>
                {currentConfig.subtitle}
              </p>
            </div>
          </div>

          {authError && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '12.5px',
              marginBottom: '16px'
            }}>
              {authError}
            </div>
          )}

          {/* MODE 1: REGISTRATION FORM */}
          {formMode === 'register' ? (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    Full Name / Entity Name *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={activeRoleTab === 'company' ? 'e.g. Reliance Fresh Ltd.' : activeRoleTab === 'fpo' ? 'e.g. Sahyadri Bio FPO' : 'e.g. Rameshwar Patil'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    Mobile Number (For SMS Alerts) *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+91 98XXX-XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    Location / District / State *
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Nashik, Maharashtra"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    {currentConfig.roleSpecificLabel}
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder={currentConfig.roleSpecificPlaceholder}
                    value={roleSpecificField}
                    onChange={(e) => setRoleSpecificField(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    Create Password / Security PIN *
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Create secure PIN (e.g. 123456)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="user@kisansetu.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Instant SMS OTP Verification Banner */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 14px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={18} color="#16a34a" />
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>
                      Automated GSM SMS Verification
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                      Sends instant confirmation SMS upon registration via DLT Gateway
                    </div>
                  </div>
                </div>
                <div style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: '700'
                }}>
                  OTP Auto-Verified ✓
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '13px',
                  background: currentConfig.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Registering...' : `Complete Registration as ${currentConfig.title}`}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* MODE 2: SIGN IN FORM */
            <form onSubmit={handleSignInSubmit}>
              <div className="form-group" style={{ marginBottom: '12px' }}>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                  Registered Mobile Number or Email
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+91 98XXX-XXXXX or user@kisansetu.in"
                  value={signInIdentifier}
                  onChange={(e) => setSignInIdentifier(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>
                  Password / PIN
                </label>
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
                  width: '100%',
                  padding: '13px',
                  background: currentConfig.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  marginBottom: '16px'
                }}
              >
                <span>Sign In to {currentConfig.title} Workspace</span>
                <ArrowRight size={16} />
              </button>

              {/* 1-Click Quick Demo Sign In */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                  Or Fast Demo Sign In (1-Click):
                </span>
                <button
                  type="button"
                  onClick={() => handle1ClickLogin(currentConfig.preset)}
                  style={{
                    width: '100%',
                    marginTop: '8px',
                    padding: '10px',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    color: '#0f172a',
                    fontWeight: '600',
                    fontSize: '12.5px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={14} color="#15803d" />
                  <span>Enter as Demo {currentConfig.preset.name}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
