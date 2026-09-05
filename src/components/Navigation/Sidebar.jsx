import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Layers, 
  Truck, 
  MapPin, 
  Users, 
  Leaf, 
  Languages, 
  LogOut,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
  ShoppingCart,
  User,
  Database
} from 'lucide-react';
import { I18N_STRINGS } from '../../data/mockData';
import { checkNeonConnection } from '../../lib/neonClient';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentLang, 
  setCurrentLang,
  openSmsModal,
  currentUser,
  onSignOut,
  onOpenAuth
}) {
  const t = I18N_STRINGS[currentLang] || I18N_STRINGS.en;
  const role = currentUser?.role || 'company';
  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true, dbName: '' });

  useEffect(() => {
    let isMounted = true;
    checkNeonConnection()
      .then((res) => {
        if (isMounted) {
          setDbStatus({ 
            connected: !!res.connected, 
            loading: false, 
            dbName: res.database || 'neondb' 
          });
        }
      })
      .catch(() => {
        if (isMounted) {
          setDbStatus({ connected: false, loading: false, dbName: '' });
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Dynamic Navigation Items based on 5 Roles
  const getNavItems = () => {
    if (role === 'admin') {
      return [
        { id: 'admin_dashboard', label: 'Master Admin Command', icon: ShieldAlert },
        { id: 'supply_matching', label: 'Supply Matching & Bids', icon: Layers },
        { id: 'traceability', label: 'Traceability & GPS Audit', icon: ShieldCheck },
        { id: 'regional_analytics', label: 'Regional Mandi Analytics', icon: MapPin },
        { id: 'logistics_hub', label: 'Logistics Fleet Dispatch', icon: Truck }
      ];
    }

    if (role === 'fpo') {
      return [
        { id: 'farmer_fpo', label: 'FPO Field Command', icon: Users },
        { id: 'supply_matching', label: 'Bulk Bids & Orders', icon: Layers },
        { id: 'traceability', label: t.traceability, icon: ShieldCheck },
        { id: 'logistics_hub', label: t.logisticsHub, icon: Truck },
        { id: 'regional_analytics', label: t.regionalAnalytics, icon: MapPin }
      ];
    }

    if (role === 'farmer') {
      return [
        { id: 'farmer_direct', label: 'My Farm Harvests & Inquiries', icon: User },
        { id: 'farmer_fpo', label: 'FPO Pooled Batch', icon: Users },
        { id: 'regional_analytics', label: 'Mandi Price Rates', icon: MapPin }
      ];
    }

    if (role === 'consumer') {
      return [
        { id: 'consumer_store', label: 'Fresh Farm Market', icon: ShoppingCart },
        { id: 'traceability', label: 'Farm Origin Trace', icon: ShieldCheck },
        { id: 'regional_analytics', label: 'Regional Harvests', icon: MapPin }
      ];
    }

    // Default: Company / Bulk Buyer
    return [
      { id: 'control_room', label: t.controlRoom, icon: BarChart3 },
      { id: 'supply_matching', label: t.supplyMatching, icon: Layers },
      { id: 'traceability', label: t.traceability, icon: ShieldCheck },
      { id: 'regional_analytics', label: t.regionalAnalytics, icon: MapPin },
      { id: 'logistics_hub', label: t.logisticsHub, icon: Truck },
      { id: 'farmer_fpo', label: 'Supply Clusters', icon: Users }
    ];
  };

  const navItems = getNavItems();

  const cycleLang = () => {
    if (currentLang === 'en') setCurrentLang('hi');
    else if (currentLang === 'hi') setCurrentLang('mr');
    else setCurrentLang('en');
  };

  const getLangLabel = () => {
    if (currentLang === 'en') return 'हिन्दी (Hindi)';
    if (currentLang === 'hi') return 'मराठी (Marathi)';
    return 'English';
  };

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-icon-box">
          <Leaf size={20} strokeWidth={2.5} />
        </div>
        <div className="brand-titles">
          <h1>{t.appTitle}</h1>
          <span>{t.procurementOs}</span>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div className="demo-pill" style={{
        background: role === 'admin' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(52, 211, 153, 0.12)',
        color: role === 'admin' ? '#fca5a5' : '#6ee7b7'
      }}>
        <span className="dot" style={{ background: role === 'admin' ? '#ef4444' : '#48bb78' }}></span>
        <span>{role === 'admin' ? 'MASTER ADMIN MODE' : `${role.toUpperCase()} PORTAL`}</span>
      </div>

      {/* Nav Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="nav-item-icon" size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Controls */}
      <div className="sidebar-footer">
        {/* Neon Cloud Database Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 10px',
          marginBottom: '6px',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '600',
          background: dbStatus.connected ? 'rgba(0, 229, 153, 0.08)' : 'rgba(255, 255, 255, 0.04)',
          border: dbStatus.connected ? '1px solid rgba(0, 229, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
          color: dbStatus.connected ? '#6ee7b7' : '#94a3b8',
          letterSpacing: '0.02em',
          transition: 'all 0.3s ease'
        }} title={dbStatus.connected ? `Connected to Neon Serverless PostgreSQL (${dbStatus.dbName})` : 'Neon Serverless Database: Ready'}>
          <Database size={13} style={{ color: dbStatus.connected ? '#00e599' : '#64748b' }} />
          <span>{dbStatus.connected ? 'Neon Cloud DB: Live' : 'Neon Serverless: Ready'}</span>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            marginLeft: 'auto',
            background: dbStatus.connected ? '#00e599' : '#64748b',
            boxShadow: dbStatus.connected ? '0 0 8px #00e599' : 'none'
          }}></span>
        </div>

        <button className="sidebar-footer-btn" onClick={openSmsModal} title="Dispatch automated SMS/WhatsApp alerts to rural farmers">
          <Smartphone size={16} />
          <span>SMS / IVR Dispatcher</span>
        </button>

        <button className="sidebar-footer-btn" onClick={cycleLang}>
          <Languages size={16} />
          <span>{getLangLabel()}</span>
        </button>

        {currentUser ? (
          <button 
            className="sidebar-footer-btn" 
            onClick={onSignOut}
            style={{ color: '#fca5a5' }}
            title="Sign out of active session"
          >
            <LogOut size={16} />
            <span>Sign out</span>
          </button>
        ) : (
          <button 
            className="sidebar-footer-btn" 
            onClick={onOpenAuth}
            style={{ color: '#86efac', fontWeight: '700' }}
          >
            <LogOut size={16} style={{ transform: 'rotate(180deg)' }} />
            <span>Sign in (5 Roles)</span>
          </button>
        )}
      </div>
    </aside>
  );
}
