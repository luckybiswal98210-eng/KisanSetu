import React, { useState, useEffect } from 'react';
import HomePage from './components/Home/HomePage';
import Sidebar from './components/Navigation/Sidebar';
import TopHeader from './components/Navigation/TopHeader';
import ControlRoom from './components/ControlRoom/ControlRoom';
import SupplyMatchingView from './components/SupplyMatching/SupplyMatchingView';
import TraceabilityView from './components/Traceability/TraceabilityView';
import RegionalAnalyticsView from './components/RegionalAnalytics/RegionalAnalyticsView';
import LogisticsView from './components/Logistics/LogisticsView';
import FarmerFPOView from './components/FarmerFPO/FarmerFPOView';
import AdminDashboard from './components/Admin/AdminDashboard';
import ConsumerStorefront from './components/Consumer/ConsumerStorefront';
import FarmerDirectDashboard from './components/FarmerDirect/FarmerDirectDashboard';
import PostDemandModal from './components/Modals/PostDemandModal';
import EarningsSimulatorModal from './components/Modals/EarningsSimulatorModal';
import SmsSimulatorModal from './components/Modals/SmsSimulatorModal';
import AuthModal from './components/Auth/AuthModal';
import KisanChatbot from './components/Common/KisanChatbot';

import { 
  PRESET_ACCOUNTS,
  INITIAL_DEMAND, 
  INITIAL_SUPPLY_MATCHES, 
  SUPPLY_HEALTH_STATS, 
  RECENT_ACTIVITY_SIGNALS,
  TRACEABILITY_ORDER,
  INITIAL_CONSUMER_REQUESTS,
  INITIAL_PLATFORM_INQUIRIES
} from './data/mockData';

export default function App() {
  // Authentication & Current User State (null if logged out)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('krishisetu_active_user');
      return saved ? JSON.parse(saved) : null; // Defaults to public Home Page
    } catch {
      return null;
    }
  });

  // Navigation & Role State (5 Roles: fpo, farmer, company, consumer, admin)
  const [currentPersona, setCurrentPersona] = useState(() => currentUser?.role || 'fpo');
  const [activeTab, setActiveTab] = useState(() => {
    const role = currentUser?.role || 'fpo';
    if (role === 'admin') return 'admin_dashboard';
    if (role === 'farmer') return 'farmer_direct';
    if (role === 'consumer') return 'consumer_store';
    if (role === 'company') return 'control_room';
    return 'farmer_fpo';
  });

  const [currentLang, setCurrentLang] = useState('en'); // 'en', 'hi', 'mr'

  // Application Data state
  const [demandData, setDemandData] = useState(() => {
    try {
      const saved = localStorage.getItem('krishisetu_demand');
      return saved ? JSON.parse(saved) : INITIAL_DEMAND;
    } catch {
      return INITIAL_DEMAND;
    }
  });

  const [supplyMatches, setSupplyMatches] = useState(INITIAL_SUPPLY_MATCHES);
  const [supplyHealth, setSupplyHealth] = useState(SUPPLY_HEALTH_STATS);
  const [recentSignals, setRecentSignals] = useState(RECENT_ACTIVITY_SIGNALS);
  const [consumerRequests, setConsumerRequests] = useState(INITIAL_CONSUMER_REQUESTS);
  
  // Platform Inquiries & Quotations State (Synced across Admin, FPO, and Farmers)
  const [platformInquiries, setPlatformInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('krishisetu_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_PLATFORM_INQUIRIES;
    } catch {
      return INITIAL_PLATFORM_INQUIRIES;
    }
  });

  // Modals state
  const [isPostDemandOpen, setIsPostDemandOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Synchronize localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('krishisetu_active_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('krishisetu_active_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('krishisetu_demand', JSON.stringify(demandData));
  }, [demandData]);

  useEffect(() => {
    localStorage.setItem('krishisetu_inquiries', JSON.stringify(platformInquiries));
  }, [platformInquiries]);

  // Handle Login from HomePage or AuthModal
  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPersona(user.role);
    if (user.role === 'admin') {
      setActiveTab('admin_dashboard');
    } else if (user.role === 'farmer') {
      setActiveTab('farmer_direct');
    } else if (user.role === 'consumer') {
      setActiveTab('consumer_store');
    } else if (user.role === 'company') {
      setActiveTab('control_room');
    } else {
      setActiveTab('farmer_fpo');
    }

    const newSignal = {
      id: `SIG-${Date.now()}`,
      type: 'success',
      title: `${user.name} logged into ${user.role.toUpperCase()} workspace`,
      timeAgo: 'Just now',
      details: `Active role: ${user.roleLabel || user.role}`
    };
    setRecentSignals([newSignal, ...recentSignals]);
    setIsAuthModalOpen(false);
  };

  // Handle Sign Out -> Returns immediately to clean Public HomePage
  const handleSignOut = () => {
    setCurrentUser(null);
    localStorage.removeItem('krishisetu_active_user');
    setIsAuthModalOpen(false);
  };

  // Handle Persona / Role quick switch from dashboard
  const handlePersonaChange = (newRole) => {
    setCurrentPersona(newRole);
    const matchingPreset = PRESET_ACCOUNTS.find(a => a.role === newRole);
    if (matchingPreset) {
      setCurrentUser(matchingPreset);
    }
    if (newRole === 'admin') {
      setActiveTab('admin_dashboard');
    } else if (newRole === 'farmer') {
      setActiveTab('farmer_direct');
    } else if (newRole === 'consumer') {
      setActiveTab('consumer_store');
    } else if (newRole === 'company') {
      setActiveTab('control_room');
    } else {
      setActiveTab('farmer_fpo');
    }
  };

  // Handle saving new demand
  const handleSaveDemand = (newDemand) => {
    setDemandData(newDemand);
    const newSignal = {
      id: `SIG-${Date.now()}`,
      type: 'info',
      title: `${newDemand.buyerName.split(' ')[0]} broadcasted a ${newDemand.targetQuantity}t ${newDemand.crop} requirement`,
      timeAgo: 'Just now',
      details: `Target: ₹${newDemand.targetPricePerKg}/kg · delivery in ${newDemand.deliveryWindowDays} days.`
    };
    setRecentSignals([newSignal, ...recentSignals]);
  };

  // If user is NOT logged in, render the clean public Home Page with the 5 Login Portals!
  if (!currentUser) {
    return (
      <>
        <HomePage
          onLogin={handleLogin}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
        <KisanChatbot currentUser={null} currentLang={currentLang} />
      </>
    );
  }

  // If user is authenticated, render their dedicated workspace dashboard
  return (
    <div className="app-layout">
      {/* 1. Left Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        openSmsModal={() => setIsSmsModalOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 2. Main Work Area */}
      <main className="main-wrapper">
        <TopHeader
          currentLang={currentLang}
          demandData={demandData}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onSignOut={handleSignOut}
        />

        {/* Dynamic 5-Role View Switcher */}
        {activeTab === 'admin_dashboard' && (
          <AdminDashboard 
            consumerRequests={consumerRequests}
            platformInquiries={platformInquiries}
            setPlatformInquiries={setPlatformInquiries}
          />
        )}

        {activeTab === 'farmer_direct' && (
          <FarmerDirectDashboard
            currentUser={currentUser}
            openSmsModal={() => setIsSmsModalOpen(true)}
            platformInquiries={platformInquiries}
            setPlatformInquiries={setPlatformInquiries}
          />
        )}

        {activeTab === 'consumer_store' && (
          <ConsumerStorefront 
            consumerRequests={consumerRequests}
            onAddConsumerRequest={(newReq) => setConsumerRequests(prev => [newReq, ...prev])}
          />
        )}

        {activeTab === 'control_room' && (
          <ControlRoom
            demandData={demandData}
            supplyMatches={supplyMatches}
            supplyHealth={supplyHealth}
            recentSignals={recentSignals}
            currentLang={currentLang}
            openPostDemandModal={() => setIsPostDemandOpen(true)}
            openSimulatorModal={() => setIsSimulatorOpen(true)}
            setActiveTab={setActiveTab}
            onSelectFpoMatch={(match) => setActiveTab('supply_matching')}
          />
        )}

        {activeTab === 'supply_matching' && (
          <SupplyMatchingView
            demandData={demandData}
            supplyMatches={supplyMatches}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'traceability' && (
          <TraceabilityView
            order={TRACEABILITY_ORDER}
          />
        )}

        {activeTab === 'regional_analytics' && (
          <RegionalAnalyticsView />
        )}

        {activeTab === 'logistics_hub' && (
          <LogisticsView />
        )}

        {activeTab === 'farmer_fpo' && (
          <FarmerFPOView
            openSmsModal={() => setIsSmsModalOpen(true)}
            platformInquiries={platformInquiries}
            setPlatformInquiries={setPlatformInquiries}
          />
        )}
      </main>

      {/* 3. Interactive Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        currentUser={currentUser}
      />

      <PostDemandModal
        isOpen={isPostDemandOpen}
        onClose={() => setIsPostDemandOpen(false)}
        onSaveDemand={handleSaveDemand}
        currentDemand={demandData}
      />

      <EarningsSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        defaultRate={demandData.totalEndPrice}
      />

      <SmsSimulatorModal
        isOpen={isSmsModalOpen}
        onClose={() => setIsSmsModalOpen(false)}
      />

      {/* 4. Global Kisan Sahayak AI Text & Voice Chatbot Assistant */}
      <KisanChatbot currentUser={currentUser} currentLang={currentLang} />
    </div>
  );
}
