import React from 'react';
import { LogOut, LogIn } from 'lucide-react';
import { I18N_STRINGS } from '../../data/mockData';

export default function TopHeader({ 
  currentLang,
  demandData,
  currentUser,
  onOpenAuth,
  onSignOut
}) {
  const t = I18N_STRINGS[currentLang] || I18N_STRINGS.en;
  const activeRole = currentUser?.role || 'company';

  // Dynamic time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (currentLang === 'hi') {
      if (hour >= 5 && hour < 12) return "शुभ प्रभात";
      if (hour >= 12 && hour < 17) return "शुभ दोपहर";
      if (hour >= 17 && hour < 21) return "शुभ संध्या";
      return "स्वागत है";
    }
    if (currentLang === 'mr') {
      if (hour >= 5 && hour < 12) return "शुभ सकाळ";
      if (hour >= 12 && hour < 17) return "शुभ दुपार";
      if (hour >= 17 && hour < 21) return "शुभ संध्याकाळ";
      return "स्वागत";
    }
    // English default
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Welcome";
  };

  const getGreetingName = () => {
    if (currentUser) return currentUser.name.split(' ')[0];
    if (activeRole === 'company') return demandData.buyerName.split(' ')[0];
    if (activeRole === 'fpo') return 'Nashik Agri FPO';
    if (activeRole === 'farmer') return 'Balasaheb (Farmer)';
    if (activeRole === 'consumer') return 'Priya (Consumer)';
    return 'Admin';
  };

  return (
    <div className="page-top-header" style={{ marginBottom: '20px' }}>
      <div>
        <span className="header-meta-tag mono">{t.tagline.toUpperCase()}</span>
        <h2 className="page-title">{getTimeGreeting()}, {getGreetingName()}</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {currentUser ? (
          <div 
            className="user-badge-header" 
            style={{ transition: 'all 0.15s ease' }}
          >
            <div 
              className="user-avatar-circle"
              style={{ background: currentUser.badgeColor || '#0d2f1b' }}
            >
              {currentUser.avatar || 'U'}
            </div>
            <div className="user-badge-text">
              <div className="name">{currentUser.name}</div>
              <div className="role">{currentUser.roleLabel || currentUser.location}</div>
            </div>
          </div>
        ) : (
          <button 
            className="btn-primary" 
            onClick={onOpenAuth}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '8px 14px' }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}

        {currentUser && (
          <button
            onClick={onSignOut}
            style={{
              background: '#ffffff',
              border: '1px solid #fed7aa',
              color: '#c2410c',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12.5px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
            title="Sign out of current account"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}

