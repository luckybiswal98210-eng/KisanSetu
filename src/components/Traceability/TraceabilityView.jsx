import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Truck, 
  Thermometer, 
  Droplets, 
  Phone, 
  ShieldCheck, 
  ChevronRight,
  QrCode,
  Sparkles,
  Building2
} from 'lucide-react';
import { TRACEABILITY_ORDER } from '../../data/mockData';

export default function TraceabilityView({ order = TRACEABILITY_ORDER }) {
  const [selectedMilestone, setSelectedMilestone] = useState(order.milestones[5]); // Picked up

  return (
    <div className="traceability-view">
      {/* Top Header Card */}
      <div className="trace-header-card">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <span className="card-header-meta mono">{order.lotNumber}</span>
            <h2 className="page-title" style={{ fontSize: '24px', margin: '4px 0 2px' }}>
              From farm to FreshFoods
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              End-to-End Cryptographic Traceability Audit Timeline
            </p>
          </div>

          <div className="trace-status-pill mono">
            ● {order.status}
          </div>
        </div>

        {/* 8-Stage Timeline Grid */}
        <div className="milestones-stepper">
          {order.milestones.map((m) => {
            const isVerified = m.status === 'verified';
            const isSelected = selectedMilestone?.id === m.id;
            return (
              <div 
                key={m.id}
                className={`milestone-box ${isVerified ? 'verified' : ''}`}
                onClick={() => setSelectedMilestone(m)}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #16a34a' : undefined,
                  boxShadow: isSelected ? '0 2px 8px rgba(22, 163, 74, 0.15)' : undefined
                }}
              >
                <div className="milestone-top">
                  {isVerified ? (
                    <div className="milestone-icon-check">
                      ✓
                    </div>
                  ) : (
                    <div className="milestone-icon-pending mono">
                      {m.id}
                    </div>
                  )}
                  <div>
                    <div className="milestone-title">{m.title}</div>
                    <div className="milestone-date mono">
                      {isVerified ? `${m.date} · verified event` : 'Awaiting next milestone'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Milestone Details Callout */}
        {selectedMilestone && (
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '12px 16px',
            fontSize: '12.5px',
            color: '#334155',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} color="#15803d" />
              <span>
                <strong>Stage {selectedMilestone.id} Audit Note:</strong> {selectedMilestone.note}
              </span>
            </div>
            <span className="mono" style={{ fontSize: '11px', color: '#64748b' }}>
              Verified on Blockchain / Cryptographic Hash
            </span>
          </div>
        )}

        {/* 3-Node Physical Transit Flow */}
        <div className="route-nodes-bar">
          <div className="route-node-item">
            <div className="route-node-icon">
              <MapPin size={20} />
            </div>
            <div className="route-node-text">
              <h5>{order.routeNodes[0].title}</h5>
              <p>{order.routeNodes[0].subtitle}</p>
            </div>
          </div>

          <div className="route-arrow">
            <ChevronRight size={24} />
          </div>

          <div className="route-node-item">
            <div className="route-node-icon">
              <Truck size={20} />
            </div>
            <div className="route-node-text">
              <h5>{order.routeNodes[1].title}</h5>
              <p>{order.routeNodes[1].subtitle}</p>
            </div>
          </div>

          <div className="route-arrow">
            <ChevronRight size={24} />
          </div>

          <div className="route-node-item">
            <div className="route-node-icon">
              <Building2 size={20} />
            </div>
            <div className="route-node-text">
              <h5>{order.routeNodes[2].title}</h5>
              <p>{order.routeNodes[2].subtitle}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Cold-Chain & In-Transit Telemetry Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {/* Cold Chain IoT */}
        <div className="content-card">
          <span className="card-header-meta">IoT COLD-CHAIN TELEMETRY</span>
          <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '6px 0 14px' }}>Reefer Sensor Readings</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Thermometer size={18} color="#2563eb" />
              <span style={{ fontSize: '13px', color: '#475569' }}>Internal Temp:</span>
            </div>
            <span className="mono" style={{ fontWeight: '700', color: '#1e293b' }}>{order.currentTemperature}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Droplets size={18} color="#0891b2" />
              <span style={{ fontSize: '13px', color: '#475569' }}>Relative Humidity:</span>
            </div>
            <span className="mono" style={{ fontWeight: '700', color: '#1e293b' }}>{order.humidity}</span>
          </div>
        </div>

        {/* Live GPS Telemetry */}
        <div className="content-card">
          <span className="card-header-meta">LIVE GPS TRACKING</span>
          <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '6px 0 14px' }}>Transit Speed & Location</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>Current Checkpoint:</span>
            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#1e293b' }}>{order.currentLocationName}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#475569' }}>Current Speed / ETA:</span>
            <span className="mono" style={{ fontWeight: '700', color: '#15803d' }}>{order.speedKmH} km/h · {order.eta}</span>
          </div>
        </div>

        {/* Driver & Digital Manifest */}
        <div className="content-card">
          <span className="card-header-meta">DRIVER & DIGITAL MANIFEST</span>
          <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '6px 0 14px' }}>{order.driverName}</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} color="#15803d" />
              <span style={{ fontSize: '12.5px', color: '#475569' }}>{order.driverPhone}</span>
            </div>
            <span className="mono" style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
              {order.vehicleNo}
            </span>
          </div>

          <button 
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onClick={() => alert(`Digital E-Way Bill & QR Manifest for ${order.lotNumber} verified.`)}
          >
            <QrCode size={14} />
            <span>View Digital E-Way QR Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
}
