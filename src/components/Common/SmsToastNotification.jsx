import React, { useState, useEffect } from 'react';
import { Smartphone, Check, X, ShieldCheck, MessageSquare, Radio } from 'lucide-react';

export default function SmsToastNotification() {
  const [activeToast, setActiveToast] = useState(null);

  useEffect(() => {
    const handleSmsEvent = (e) => {
      if (e.detail) {
        setActiveToast(e.detail);
        // Auto-dismiss after 6 seconds
        const timer = setTimeout(() => {
          setActiveToast(null);
        }, 6000);
        return () => clearTimeout(timer);
      }
    };

    window.addEventListener('kisansetu_sms_dispatched', handleSmsEvent);
    return () => window.removeEventListener('kisansetu_sms_dispatched', handleSmsEvent);
  }, []);

  if (!activeToast) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 99999,
      maxWidth: '420px',
      width: 'calc(100vw - 40px)',
      background: '#0f172a',
      color: '#ffffff',
      borderRadius: '14px',
      boxShadow: '0 12px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15)',
      padding: '16px',
      animation: 'slide-in-right 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      fontFamily: 'Plus Jakarta Sans, sans-serif'
    }}>
      {/* Toast Top Status Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            background: '#15803d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Smartphone size={14} />
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#4ade80', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              LIVE SMS DISPATCHED · DELIVERED
            </div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>
              Telecom DLT Route: {activeToast.gatewayId || 'DLT-110155294821'}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setActiveToast(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Recipient & Carrier Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '8px',
        padding: '8px 12px',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11.5px'
      }}>
        <div>
          <span style={{ color: '#cbd5e1' }}>To: </span>
          <strong style={{ color: '#ffffff' }}>{activeToast.to}</strong>
          {activeToast.recipientName && (
            <span style={{ color: '#94a3b8' }}> ({activeToast.recipientName})</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#86efac', fontWeight: '700' }}>
          <Check size={13} />
          <span>Delivered ✓✓</span>
        </div>
      </div>

      {/* Message Body */}
      <div style={{
        background: '#ffffff',
        color: '#0f172a',
        borderRadius: '8px',
        padding: '10px 12px',
        fontSize: '12.5px',
        lineHeight: '1.45',
        fontWeight: '500',
        maxHeight: '120px',
        overflowY: 'auto'
      }}>
        {activeToast.message}
      </div>

      {/* Bottom Telemetry Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', fontSize: '10.5px', color: '#94a3b8' }}>
        <span>Network: Airtel / Jio 4G GSM</span>
        <span>{activeToast.timestamp || 'Just now'}</span>
      </div>
    </div>
  );
}
