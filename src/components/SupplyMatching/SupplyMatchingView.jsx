import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Search, 
  Filter, 
  Building2, 
  Users, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SupplyMatchingView({ 
  demandData, 
  supplyMatches, 
  onAcceptMatch, 
  setActiveTab 
}) {
  const [selectedMatches, setSelectedMatches] = useState(["MAT-001", "MAT-002", "MAT-003"]);
  const [filterCategory, setFilterCategory] = useState("all");
  const [contractLocked, setContractLocked] = useState(false);

  const toggleSelect = (id) => {
    if (selectedMatches.includes(id)) {
      setSelectedMatches(selectedMatches.filter(item => item !== id));
    } else {
      setSelectedMatches([...selectedMatches, id]);
    }
  };

  const selectedMatchesList = supplyMatches.filter(m => selectedMatches.includes(m.id));
  const aggregatedTonnes = selectedMatchesList.reduce((acc, curr) => acc + curr.quantityTonnes, 0);
  const aggregatedFarmers = selectedMatchesList.reduce((acc, curr) => acc + curr.farmerCount, 0);
  const avgRate = selectedMatchesList.length > 0 
    ? (selectedMatchesList.reduce((acc, curr) => acc + curr.proposedRate, 0) / selectedMatchesList.length).toFixed(2)
    : 0;

  const handleLockEscrow = () => {
    setContractLocked(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });
    setTimeout(() => {
      setActiveTab('traceability');
    }, 2000);
  };

  return (
    <div className="supply-matching-view">
      {/* Header Banner */}
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
          <span className="card-header-meta">AI PROCUREMENT ENGINE · MULTI-FPO AGGREGATOR</span>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', fontWeight: '700' }}>
            Supply Pool for {demandData.targetQuantity}t {demandData.crop}
          </h2>
          <p style={{ fontSize: '13px', color: '#526b5c', marginTop: '4px' }}>
            Matching algorithm evaluates quality confidence, radius distance from cold hubs, and harvest timing.
          </p>
        </div>

        <div style={{
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          padding: '10px 18px',
          borderRadius: '8px',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>AGGREGATED POOL VOLUME</div>
          <div className="mono" style={{ fontSize: '20px', fontWeight: '800', color: '#14532d' }}>
            {aggregatedTonnes.toFixed(1)} / {demandData.targetQuantity} t
          </div>
          <div style={{ fontSize: '11px', color: '#15803d' }}>
            ({aggregatedFarmers} smallholder farmers connected)
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '24px' }}>
        {/* Left Column: List of Matched FPOs */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#14281d' }}>
              Ranked Supply Sources ({supplyMatches.length})
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Select FPOs to combine and fulfill requirement
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {supplyMatches.map((match) => {
              const isSelected = selectedMatches.includes(match.id);
              return (
                <div 
                  key={match.id}
                  style={{
                    background: '#ffffff',
                    border: isSelected ? '2px solid #16a34a' : '1px solid #e1ebe3',
                    borderRadius: '10px',
                    padding: '18px 20px',
                    boxShadow: isSelected ? '0 4px 12px rgba(22, 163, 74, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => toggleSelect(match.id)}
                        style={{ width: '18px', height: '18px', accentColor: '#15803d', cursor: 'pointer' }}
                      />
                      <div className="match-circle-score" style={{ width: '48px', height: '48px' }}>
                        <span className="score-num">{match.matchScore}</span>
                        <span className="score-pct">% MATCH</span>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#14281d' }}>{match.fpoName}</h4>
                          <span className="mono" style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#475569' }}>
                            #{match.rank}
                          </span>
                        </div>
                        <div style={{ fontSize: '12.5px', color: '#475569', display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2px' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <MapPin size={13} /> {match.location} ({match.distanceKm} km)
                          </span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={13} /> {match.daysToHarvest} days to harvest
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div className="mono" style={{ fontSize: '18px', fontWeight: '800', color: '#0d2f1b' }}>
                        {match.quantityTonnes} t
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#15803d', fontWeight: '600' }}>
                        ₹{match.proposedRate.toFixed(2)}/kg
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '10px',
                    background: '#f8fafc',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    marginTop: '8px'
                  }}>
                    <div>
                      <span style={{ color: '#64748b' }}>Connected Farmers:</span>
                      <div style={{ fontWeight: '700', color: '#1e293b' }}>{match.farmerCount} farmers</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Certification:</span>
                      <div style={{ fontWeight: '700', color: '#15803d' }}>{match.qualityCert}</div>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>FPO Contact Lead:</span>
                      <div style={{ fontWeight: '600', color: '#1e293b' }}>{match.leadContact}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Aggregation Summary & Escrow Lock */}
        <div>
          <div style={{
            background: '#ffffff',
            border: '1px solid #e1ebe3',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            position: 'sticky',
            top: '20px'
          }}>
            <span className="card-header-meta">PROCUREMENT SUMMARY</span>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '18px' }}>
              Multi-FPO Escrow Contract
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Selected FPO Clusters:</span>
                <span className="mono" style={{ fontWeight: '700' }}>{selectedMatches.length} clusters</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Total Aggregated Weight:</span>
                <span className="mono" style={{ fontWeight: '700', color: '#15803d' }}>{aggregatedTonnes.toFixed(1)} tonnes</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Average Farm-Gate Rate:</span>
                <span className="mono" style={{ fontWeight: '700' }}>₹{avgRate} / kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Cold-Chain & Route Freight:</span>
                <span className="mono" style={{ fontWeight: '700' }}>₹3.20 / kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px' }}>
                <span style={{ fontWeight: '700', color: '#0d2f1b' }}>Total Estimated Escrow:</span>
                <span className="mono" style={{ fontSize: '18px', fontWeight: '800', color: '#0d2f1b' }}>
                  ₹{(aggregatedTonnes * 1000 * (Number(avgRate) + 3.20)).toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '12px',
              color: '#166534',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={18} style={{ flexShrink: 0 }} />
              <span>
                <strong>Guaranteed Escrow:</strong> 100% funds held securely until quality inspection passes at receiving warehouse.
              </span>
            </div>

            {contractLocked ? (
              <div style={{
                background: '#0d2f1b',
                color: '#ffffff',
                padding: '14px',
                borderRadius: '8px',
                textAlign: 'center',
                fontWeight: '700'
              }}>
                <CheckCircle2 size={20} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: '#4ade80' }} />
                Escrow Locked! Redirecting to Traceability...
              </div>
            ) : (
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={handleLockEscrow}
                disabled={selectedMatches.length === 0}
              >
                <Lock size={16} />
                <span>Confirm & Lock Escrow Contract</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
