import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  PhoneCall, 
  HelpCircle, 
  Leaf, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Building2,
  ShoppingCart,
  User
} from 'lucide-react';
import { KISAN_AI_CHATBOT_KNOWLEDGE, GOVERNMENT_BENCHMARK_PRICES } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function KisanChatbot({ currentUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('hi'); // 'hi' | 'en' | 'mr'
  const messagesEndRef = useRef(null);
  const timerRef = useRef(null);

  const role = currentUser?.role || 'consumer';
  const userName = currentUser?.name || 'Guest User';

  // Dynamic Time-of-day greeting calculation
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Welcome";
  };

  // Initial welcome message tailored to the user's role and time of day
  useEffect(() => {
    const greeting = getTimeGreeting();
    let initialGreetingText = "";

    if (role === 'farmer') {
      initialGreetingText = `🙏 Namaste ${userName}! ${greeting}! I am your Kisan Sahayak AI advisor.\n\nI can help you with:\n• Pesticide & disease remedies for your crops (Tomatoes, Onions)\n• Government MSP rates & mandi price trends\n• Weather warnings & FPO harvest pooling\n\nYou can type your question or tap the 🎤 Microphone button to speak in Hindi, Marathi, or English. How can I help you today?`;
    } else if (role === 'fpo') {
      initialGreetingText = `🏢 Hello ${userName}! ${greeting}! I am your FPO Operational Assistant.\n\nI can assist you with:\n• Packhouse cold storage optimization\n• Reviewing & quoting on incoming buyer demands\n• MCA audit compliance & farmer pooling\n\nHow can I support your FPO today?`;
    } else if (role === 'consumer') {
      initialGreetingText = `🛒 Hello ${userName}! ${greeting}! I am your KisanSetu Farm Fresh Guide.\n\nI can help you with:\n• 100% Farm-to-fork origin traceability\n• 1st preference smallholder farmer delivery guarantee\n• Certified organic & pesticide-residue-free produce\n\nWhat fresh harvests are you looking for today?`;
    } else if (role === 'company') {
      initialGreetingText = `🏭 Hello ${userName}! ${greeting}! I am your Enterprise Procurement AI.\n\nI can assist with:\n• Multi-FPO supply aggregation (100t+ lots)\n• Cold-chain telematics & GPS tracking SLAs\n• Escrow-backed forward contracts\n\nHow can I help your procurement team today?`;
    } else {
      initialGreetingText = `🛡️ Hello ${userName}! ${greeting}! I am your Master Admin AI Copilot.\n\nI can assist with:\n• 7-Day short-term crop price forecasting & market intelligence\n• State & District FPO registry audits\n• Escrow liquidity & logistics telematics\n\nWhat platform stream would you like to inspect?`;
    }

    setMessages([
      {
        id: "msg-init",
        sender: "ai",
        text: initialGreetingText,
        timestamp: "Just now"
      }
    ]);
  }, [role, userName]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Voice recording simulation
  const startRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    timerRef.current = setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecordingAndSend = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);

    // Simulated regional speech-to-text transcript based on role
    let voiceQuery = "";
    if (role === 'farmer') {
      voiceQuery = selectedLanguage === 'hi' 
        ? "टमाटर में पत्ता मरोड़ और कीड़ों के लिए कौन सी दवा स्प्रे करें?" 
        : selectedLanguage === 'mr'
        ? "टोमॅटो पिकावर करपा रोगासाठी कोणते औषध फवारावे?"
        : "Which bio-pesticide to spray for tomato early blight?";
    } else if (role === 'consumer') {
      voiceQuery = "How is my produce directly sourced from individual farmers?";
    } else {
      voiceQuery = "What is the 7-day price forecast for tomatoes?";
    }

    handleSendMessage(voiceQuery, true);
  };

  // AI Response Processing Engine
  const handleSendMessage = (textToSend = inputText, isVoice = false) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: text,
      isVoice: isVoice,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI thinking and generate tailored answers
    setTimeout(() => {
      const lower = text.toLowerCase();
      let aiReply = "";

      // 1. Pesticide & Crop Disease Queries
      if (lower.includes('pesticide') || lower.includes('दवा') || lower.includes('रोग') || lower.includes('कीड़') || lower.includes('blight') || lower.includes('spray') || lower.includes('औषध')) {
        aiReply = `🌿 **Recommended Crop Protection Advisory:**\n\n**1. For Early/Late Blight (करपा/फफूंद):**\n• **Organic:** Spray Neem Oil (Azadirachtin 10000 PPM) @ 3ml/L or Trichoderma viride @ 5g/L.\n• **Chemical (If Severe):** Mancozeb 75% WP @ 2.5g/L or Copper Oxychloride 50% WP @ 3g/L.\n\n**2. For Fruit Borer / Leaf Curl (मरोड़िया/कीट):**\n• Install Yellow Sticky Traps (10/acre) + Pheromone traps.\n• Spray Emamectin Benzoate 5% SG @ 0.5g/liter.\n\n⚠️ *Safety Tip: Maintain 7-day waiting period before harvest after chemical spray.*`;
      } 
      // 2. MSP & Government Benchmark Price Queries
      else if (lower.includes('msp') || lower.includes('price') || lower.includes('rate') || lower.includes('भाव') || lower.includes('दाम') || lower.includes('bench')) {
        aiReply = `💰 **Official Government MSP & Benchmark Price (Nashik District):**\n\n• **Roma Tomatoes:** ₹18.50/kg (Fair Benchmark) · Current Farm-Gate: ₹23.80/kg (+₹5.80 gain!)\n• **Red Onions (55mm):** ₹24.00/kg (Benchmark) · Current Farm-Gate: ₹32.00/kg\n• **Dindori Grapes:** ₹55.00/kg (Benchmark) · Farm-Gate: ₹72.00/kg\n\n🔒 *All payments are 100% escrow protected with direct bank transfer.*`;
      }
      // 3. 7-Day Price Drop Forecasting Query
      else if (lower.includes('forecast') || lower.includes('future') || lower.includes('drop') || lower.includes('prediction') || lower.includes('7 day')) {
        aiReply = `📊 **AI 7-Day Price Forecast Summary:**\n\n• **Tomatoes:** ⚠️ Projected -29.4% drop over next 7 days (from ₹23.80 to ₹16.80/kg) due to Karnataka supply glut. *Recommendation: Liquidate ready packhouse stock early within 48-72h.*\n• **Onions:** 🚀 Projected +20.3% price surge (from ₹32.00 to ₹38.50/kg) due to export demand.\n• **Potatoes:** ⚖️ Stable at ₹18.00 - ₹18.50/kg.`;
      }
      // 4. Logistics & Delivery Queries
      else if (lower.includes('logistic') || lower.includes('deliver') || lower.includes('pickup') || lower.includes('transport') || lower.includes('गाड़ी') || lower.includes('वाहतूक')) {
        aiReply = `🚚 **KisanSetu 3-Way Logistics Model:**\n\n1. **Farmer / FPO Direct Delivery:** Local packhouse vehicle dispatch.\n2. **Buyer Self-Pickup:** Direct collection from farm-gate.\n3. **KisanSetu Smart 3PL Cold-Chain:** Refrigerated vans with live IoT temperature & GPS tracking.\n\nOrders for consumers are routed with **1st preference directly to nearby smallholder farmers**!`;
      }
      // 5. Customer Care / Helpline / Fallback
      else {
        aiReply = `ℹ️ For specialized crop advisories or order assistance, our official agricultural helplines are available:\n\n📞 **Kisan Call Centre (Toll-Free Govt. Helpline):**\n👉 **1800-180-1551** (6:00 AM - 10:00 PM, All 7 Days)\n\n🏛️ **Regional KVK Nashik Extension Office:** +91 253-2415891\n✉️ **Platform Support:** support@kisansetu.gov.in\n\nFeel free to ask another question about crop diseases, MSP rates, or orders!`;
      }

      const aiMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 600);
  };

  // Quick prompt buttons based on role
  const getQuickPrompts = () => {
    if (role === 'farmer') {
      return [
        { label: "🌿 Tomato Leaf Blight Remedy", query: "Which bio-pesticide to spray for tomato early blight?" },
        { label: "💰 Today's Government MSP Rates", query: "What are today's government MSP and mandi benchmark rates?" },
        { label: "📞 Kisan Call Centre Helpline", query: "What is the Kisan Call Centre customer support phone number?" }
      ];
    }
    if (role === 'fpo') {
      return [
        { label: "📦 Packhouse Storage Advisory", query: "How to optimize packhouse cold storage for tomatoes?" },
        { label: "📊 7-Day Crop Price Forecast", query: "What is the 7-day price forecast for tomatoes and onions?" },
        { label: "🚚 3-Way Logistics Options", query: "What are the 3 logistics fulfillment models available?" }
      ];
    }
    if (role === 'consumer') {
      return [
        { label: "🌾 1st Preference Farmer Direct", query: "How does 1st preference smallholder farmer delivery work?" },
        { label: "🛡️ Organic & Quality Guarantee", query: "Are these vegetables certified and pesticide residue free?" },
        { label: "💰 Government Fair Benchmark", query: "What is the fair benchmark price for tomatoes?" }
      ];
    }
    return [
      { label: "⚠️ 7-Day Price Drop Alert", query: "What is the 7-day short-term price drop prediction?" },
      { label: "🌿 UN SDG Alignment Impact", query: "How is KisanSetu aligned with UN Sustainable Development Goals?" },
      { label: "📞 Government Support Helpline", query: "What is the official helpline number?" }
    ];
  };

  return (
    <>
      {/* 1. Floating Toggle Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); confetti({ particleCount: 40, spread: 50, origin: { y: 0.9, x: 0.9 } }); }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9999,
            background: 'linear-gradient(135deg, #166534 0%, #15803d 100%)',
            color: '#ffffff',
            border: '2px solid #bbf7d0',
            borderRadius: '30px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 8px 24px rgba(22, 101, 52, 0.35)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'Outfit, sans-serif',
            fontSize: '14px',
            fontWeight: '700'
          }}
          title="Open Kisan Sahayak AI Assistant"
        >
          <div style={{ position: 'relative' }}>
            <Bot size={22} />
            <span style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 8px #4ade80'
            }} />
          </div>
          <span>Kisan Sahayak AI</span>
          <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '12px', fontWeight: '600' }}>
            Voice & Text
          </span>
        </button>
      )}

      {/* 2. Expanded Chatbot Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
          width: '380px',
          maxWidth: 'calc(100vw - 30px)',
          height: '560px',
          maxHeight: 'calc(100vh - 40px)',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          border: '1.5px solid #dcfce7',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0d2f1b 0%, #166534 100%)',
            color: '#ffffff',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0d2f1b'
              }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '700' }}>Kisan Sahayak AI</h4>
                <span style={{ fontSize: '11px', color: '#86efac', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  Online · {role.toUpperCase()} Workspace
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '6px',
                  fontSize: '11px',
                  padding: '3px 6px',
                  cursor: 'pointer'
                }}
              >
                <option value="hi" style={{ color: '#000' }}>हिन्दी</option>
                <option value="mr" style={{ color: '#000' }}>मराठी</option>
                <option value="en" style={{ color: '#000' }}>English</option>
              </select>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.8
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div style={{
            background: '#f8fafc',
            borderBottom: '1px solid #e2e8f0',
            padding: '8px 12px',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            {getQuickPrompts().map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '14px',
                  padding: '4px 10px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div style={{
            flex: 1,
            padding: '14px',
            overflowY: 'auto',
            background: '#fcfdfd',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  background: msg.sender === 'user' ? '#166534' : '#ffffff',
                  color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                  borderRadius: '12px',
                  borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                  borderTopLeftRadius: msg.sender === 'ai' ? '2px' : '12px',
                  padding: '10px 14px',
                  fontSize: '12.5px',
                  lineHeight: '1.5',
                  border: msg.sender === 'ai' ? '1px solid #e2e8f0' : 'none',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                  whiteSpace: 'pre-line'
                }}>
                  {msg.isVoice && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '4px', marginBottom: '4px' }}>
                      <Mic size={10} /> Voice Query
                    </span>
                  )}
                  {msg.text}
                </div>
                <span style={{ fontSize: '10px', color: '#94a3b8', marginTop: '3px', padding: '0 4px' }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Recording Overlay when active */}
          {isRecording && (
            <div style={{
              background: '#fef2f2',
              borderTop: '1px solid #fecaca',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'pulse 1.5s infinite'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b91c1c' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', animation: 'ping 1s infinite' }} />
                <span style={{ fontSize: '12px', fontWeight: '700' }}>
                  Listening in {selectedLanguage.toUpperCase()}... (00:0{recordingSeconds})
                </span>
              </div>
              <button
                onClick={stopRecordingAndSend}
                style={{
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                Send Voice
              </button>
            </div>
          )}

          {/* Input Footer */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid #e2e8f0',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {/* Microphone Button */}
            <button
              onClick={isRecording ? stopRecordingAndSend : startRecording}
              style={{
                background: isRecording ? '#ef4444' : '#f1f5f9',
                color: isRecording ? '#ffffff' : '#166534',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title={isRecording ? "Stop recording" : "Speak in your regional language"}
            >
              {isRecording ? <MicOff size={17} /> : <Mic size={17} />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
              placeholder={isRecording ? "Listening..." : "Ask crop disease, MSP rate, orders..."}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #cbd5e1',
                borderRadius: '20px',
                fontSize: '12.5px',
                outline: 'none'
              }}
            />

            <button
              onClick={() => handleSendMessage()}
              style={{
                background: '#166534',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
