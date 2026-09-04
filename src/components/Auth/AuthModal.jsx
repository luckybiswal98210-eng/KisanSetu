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
  Sparkles
} from 'lucide-react';
import { PRESET_ACCOUNTS } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function AuthModal({ isOpen, onClose, onLogin, currentUser }) {
  if (!isOpen) return null;

  const [activeRoleTab, setActiveRoleTab] = useState('fpo'); // 'fpo', 'farmer', 'company', 'consumer', 'admin'
  const [formMode, setFormMode] = useState('login'); // 'login' or 'register'
  
  // Form fields
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [roleSpecificField, setRoleSpecificField] = useState(''); // GSTIN / FPO Reg / Land Acres / Admin Key

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
      title: "Platform Master Administrator",
      subtitle: "Full master oversight over all FPOs, Companies, Farmers, Consumers, GMV, Escrow vault, and Logistics.",
      icon: ShieldAlert,
      color: "#7c2d12",
      bgLight: "#fef2f2",
      roleSpecificLabel: "Super Admin Master Passcode",
      roleSpecificPlaceholder: "Enter 6-digit Master Key (Demo: 999999)",
      preset: PRESET_ACCOUNTS.find(a => a.role === 'admin')
    }
  };

  const currentConfig = roleConfigs[activeRoleTab];

  const handle1ClickLogin = (presetAccount) => {
    onLogin(presetAccount);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || currentConfig.preset.name;
    const userAccount = {
      id: `usr-${activeRoleTab}-${Date.now()}`,
      name: finalName,
      role: activeRoleTab,
      roleLabel: currentConfig.title,
      email: emailOrPhone.includes('@') ? emailOrPhone : `${finalName.toLowerCase().replace(/\s+/g, '')}@krishisetu.in`,
      phone: emailOrPhone.includes('@') ? '+91 98000-00000' : (emailOrPhone || '+91 98XXX-XXXXX'),
      location: location || 'Maharashtra, India',
      avatar: finalName.charAt(0).toUpperCase(),
      badgeColor: currentConfig.color,
      customDetail: roleSpecificField || currentConfig.roleSpecificPlaceholder
    };

    onLogin(userAccount);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header" style={{ background: '#0d2f1b', color: '#ffffff', borderRadius: '16px 16px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#1e5e36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#55efc4' }}>
              <Leaf size={20} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: '10.5px', color: '#68d391', letterSpacing: '0.8px' }}>
                KRISHISETU DIRECT AGRI-OS
              </div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', margin: 0 }}>
                {currentUser ? `Switch Role (${currentUser.name})` : 'Select Portal to Sign In or Register'}
              </h3>
            </div>
          </div>
          <button className="modal-close-btn" style={{ color: '#a7f3d0' }} onClick={onClose}>
            <X size={20} />
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
            padding: '14px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'flex-start',
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
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: currentConfig.color, margin: 0 }}>
                {currentConfig.title} Portal
              </h4>
              <p style={{ fontSize: '12px', color: '#475569', margin: '3px 0 0', lineHeight: '1.4' }}>
                {currentConfig.subtitle}
              </p>
            </div>
          </div>

          {/* Custom Login / Registration Form */}
          <form onSubmit={handleCustomSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label">Full Name / Entity Name</label>
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
                <label className="form-label">Mobile Number or Email</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+91 98XXX-XXXXX or email"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>
            </div>

              <div className="form-group">
                <label className="form-label">Location / City / District</label>
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
                <label className="form-label">Password / Security PIN</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                background: currentConfig.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '13.5px',
                marginTop: '10px'
              }}
            >
              <span>Continue as {currentConfig.title}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
