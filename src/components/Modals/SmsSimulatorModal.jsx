import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  MessageSquare, 
  Mail, 
  Mic, 
  MicOff, 
  Volume2, 
  Check, 
  Send, 
  Globe, 
  Sparkles,
  Layers,
  FileText,
  UserCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SmsSimulatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [channel, setChannel] = useState('whatsapp'); // 'sms' | 'whatsapp' | 'email' | 'voice'
  const [language, setLanguage] = useState('hi');
  const [templateType, setTemplateType] = useState('monthly_harvest');
  const [recipientType, setRecipientType] = useState('farmers');
  const [isDispatched, setIsDispatched] = useState(false);
  
  // Voice Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);

  const startVoiceRecording = () => {
    setIsRecordingAudio(true);
    setAudioSeconds(0);
    const interval = setInterval(() => {
      setAudioSeconds(prev => {
        if (prev >= 10) {
          clearInterval(interval);
          setIsRecordingAudio(false);
          setHasRecordedAudio(true);
          return 10;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const stopVoiceRecording = () => {
    setIsRecordingAudio(false);
    setHasRecordedAudio(true);
  };

  const multilingualTemplates = {
    monthly_harvest: {
      en: {
        subject: "[KisanSetu] Monthly Produce Stored & Packhouse Inventory Summary",
        sms: "[KisanSetu Alert] Monthly Harvest Stored: 4,500 kg Grade-A Roma Tomatoes & 3,200 kg Nashik Red Onions ready at Niphad Packhouse Hub. Guaranteed Rate: Rs 23.80/kg. Escrow Vault Active.",
        whatsapp: "📦 *KisanSetu Monthly Harvest & Packhouse Stock Report*\n\nDear Stakeholder,\nFresh monthly harvest batches have been verified and stored in the central regional packhouse:\n\n• *Grade-A Roma Tomatoes:* 4,500 kg (450 crates)\n• *Nashik Red Onions (55mm):* 3,200 kg\n• *Packhouse Location:* Niphad Hub, Nashik\n• *Escrow Secured Price:* ₹23.80/kg (Direct Bank Credit)\n\nAvailable for immediate distribution and procurement allocation.",
        email: "Dear Partner,\n\nWe are pleased to inform you that the monthly farm harvest aggregation for September 2026 has been successfully verified and stored at the Niphad Packhouse Hub.\n\nSummary of Stored Batches:\n- Produce: Grade-A Roma Tomatoes (4,500 kg) & Nashik Red Onions (3,200 kg)\n- Storage Conditions: Pre-cooled to 2°C with humidity-controlled atmosphere\n- Quality Certification: Verified by Local FPO Field Inspector\n- Direct Payout Protection: 100% Guaranteed via KisanSetu Escrow Vault\n\nLog in to your KisanSetu dashboard to view allocation status or request dispatch.\n\nWarm regards,\nKisanSetu National Procurement OS Team",
        voiceText: 'Audio Voice Call (English): "Hello Balasaheb! This is KisanSetu Automated Field Dispatch. Your monthly batch of 4,500 kg Grade-A Tomatoes is safely stored at Niphad Packhouse with guaranteed rate Rs 23.80/kg. Press 1 to confirm dispatch."'
      },
      hi: {
        subject: "[किसानसेतु] मासिक उत्पाद भंडारण एवं पैकहाउस इन्वेंटरी रिपोर्ट",
        sms: "[किसानसेतु अलर्ट] मासिक फसल भंडारण: 4,500 किलो ग्रेड-ए टमाटर और 3,200 किलो नासिक प्याज निफाड़ पैकहाउस में सुरक्षित। निश्चित दर: ₹23.80/किलो। एस्क्रो भुगतान सक्रिय।",
        whatsapp: "📦 *किसानसेतु मासिक फसल भंडारण एवं पैकहाउस रिपोर्ट*\n\nप्रिय किसान भाई एवं हितधारक,\nसितंबर 2026 की मासिक ताज़ा फसल का सत्यापन कर निफाड़ केंद्रीय पैकहाउस में भंडारण कर दिया गया है:\n\n• *ग्रेड-ए रोमा टमाटर:* 4,500 किलो (450 क्रेट)\n• *नासिक लाल प्याज:* 3,200 किलो\n• *भंडारण केंद्र:* निफाड़ हब, नासिक\n• *सुरक्षित एस्क्रो दर:* ₹23.80/किलो (सीधे बैंक खाते में)\n\nयह स्टॉक तत्काल आवंटन एवं थोक आपूर्ति के लिए उपलब्ध है।",
        email: "नमस्ते,\n\nकिसानसेतु प्लेटफॉर्म के माध्यम से सूचित किया जाता है कि नासिक जिले के निफाड़ पैकहाउस में मासिक फसल का सुरक्षित भंडारण पूरा हो चुका है।\n\nभंडारित फसल विवरण:\n- टमाटर (ग्रेड-ए): 4,500 किलो | प्याज: 3,200 किलो\n- तापमान व गुणवत्ता: प्री-कूल्ड (2°C) नियंत्रित वातावरण\n- भुगतान सुरक्षा: किसानसेतु एस्क्रो वॉल्ट द्वारा शत-प्रतिशत सुरक्षित\n\nअधिक जानकारी के लिए अपने किसानसेतु पोर्टल पर लॉग इन करें।\n\nसादर,\nकिसानसेतु राष्ट्रीय खरीद अवसंरचना",
        voiceText: 'ऑडियो वॉयस संदेश (हिन्दी): "नमस्ते बालासाहेब जी! किसानसेतु स्वचालित वॉयस संदेश। आपकी 4,500 किलो टमाटर की फसल निफाड़ पैकहाउस में ₹23.80 प्रति किलो की सुरक्षित दर पर जमा हो गई है। डिलीवरी पुष्टि के लिए 1 दबाएं।"'
      },
      mr: {
        subject: "[किसानसेतू] मासिक शेतमाल साठा व पॅकहाऊस अहवाल",
        sms: "[किसानसेतू अलर्ट] मासिक शेतमाल साठा: 4,500 किलो टोमॅटो आणि 3,200 किलो कांदा निफाड पॅकहाऊसमध्ये सुरक्षित. हमी भाव: ₹23.80/किलो. थेट बँक खात्यात एस्क्रो जमा.",
        whatsapp: "📦 *किसानसेतू मासिक शेतमाल साठा व थेट संकलन अहवाल*\n\nनमस्कार शेतकरी मित्र व सभासद,\nसप्टेंबर 2026 मधील ताज्या शेतमालाची प्रतवारी पूर्ण करून निफाड मध्यवर्ती पॅकहाऊसमध्ये सुरक्षित साठवणूक करण्यात आली आहे:\n\n• *उत्कृष्ट रोमा टोमॅटो:* 4,500 किलो (450 क्रेट)\n• *नाशिक लाल कांदा:* 3,200 किलो\n• *संकलन केंद्र:* निफाड ॲग्री हब\n• *हमी थेट दर:* ₹23.80 / किलो (दलाली विरहित)\n\nहा साठा त्वरित वितरण व वितरणासाठी सज्ज आहे.",
        email: "सस्नेह नमस्कार,\n\nकिसानसेतू डिजिटल प्रणालीद्वारे कळविण्यात येते की, नासिक जिल्ह्यातील निफाड केंद्रावर चालू महिन्यातील शेतमालाची गुणवत्ता तपासणी व साठवणूक यशस्वीरीत्या पूर्ण झाली आहे.\n\nसाठवणूक माहिती:\n- टोमॅटो: 4,500 किलो | कांदा: 3,200 किलो\n- थेट बँक हस्तांतरण एस्क्रो वॉल्टद्वारे संरक्षित\n\nआपल्या किसानसेतू खात्यावर जाऊन सविस्तर तपशील तपासा.\n\nआपला नम्र,\nकिसानसेतू कृषी व्यवस्थापन कक्ष",
        voiceText: 'ऑडिओ व्हॉईस कॉल (मराठी): "नमस्कार बाळासाहेब! किसानसेतू व्हॉईस प्रणाली. आपला 4,500 किलो टोमॅटो माल निफाड केंद्रावर हमी भाव ₹23.80 ने साठवला गेला आहे. पुष्टीसाठी 1 दाबा."'
      }
    },
    demand_inquiry: {
      en: {
        subject: "[KisanSetu Demand Inquiry] State & District Produce Availability Check",
        sms: "[KisanSetu Inquiry] Order Request for 12 kg Tomatoes in Nashik District. Please confirm ready stock and submit price quote via FPO portal.",
        whatsapp: "📢 *KisanSetu Demand Broadcast Alert*\n\nDear FPO Leader / Farmer,\nAn active purchase demand has been received for *Roma Tomatoes (12 kg)* in your district:\n\n• *Target Area:* Maharashtra > Nashik\n• *Buyer Type:* Verified Retail Consumer\n• *Action Required:* Submit your farm-gate supply quotation (₹/kg) on your portal.",
        email: "Dear FPO Manager,\n\nA new produce inquiry has been broadcasted by Platform Admin for your district. Please inspect the quantity requirements and submit your price quote to proceed with logistics allocation.",
        voiceText: 'Audio IVR Call (English): "Urgent demand broadcast: 12 kg Tomatoes requested in Nashik district. Please open your FPO portal and submit your price quote."'
      },
      hi: {
        subject: "[किसानसेतु मांग सूचना] जिलावार फसल उपलब्धता एवं मूल्य कोटेशन",
        sms: "[किसानसेतु जांच] नासिक जिले में 12 किलो टमाटर की खरीद मांग आई है। कृपया एफपीओ पोर्टल पर अपनी दर (कोटेशन) दर्ज करें।",
        whatsapp: "📢 *किसानसेतु मांग प्रसारण अलर्ट*\n\nप्रिय एफपीओ लीडर / किसान साथी,\nआपके जिले में *12 किलो रोमा टमाटर* की ताजा मांग प्राप्त हुई है:\n\n• *स्थान:* महाराष्ट्र > नासिक (निफाड़)\n• *खरीदार:* सत्यापित घरेलू उपभोक्ता\n• *कार्रवाई:* अपने पोर्टल पर अपना आपूर्ति मूल्य (₹/किलो) दर्ज कर भेजें।",
        email: "नमस्ते,\n\nकिसानसेतु एडमिन द्वारा आपके क्षेत्र के लिए उत्पाद उपलब्धता की जांच भेजी गई है। कृपया पोर्टल पर लॉगिन कर अपनी दर सबमिट करें।",
        voiceText: 'ऑडियो वॉयस संदेश (हिन्दी): "नासिक जिले में 12 किलो टमाटर की नई खरीद मांग आई है। कृपया अपने पोर्टल पर जाकर दर दर्ज करें।"'
      },
      mr: {
        subject: "[किसानसेतू मागणी चौकशी] जिल्हास्तरीय शेतमाल मागणी व दर",
        sms: "[किसानसेतू चौकशी] नाशिक जिल्ह्यात 12 किलो टोमॅटोची मागणी आली आहे. कृपया पोर्टलवर आपला विक्री दर नोंदवा.",
        whatsapp: "📢 *किसानसेतू थेट मागणी सूचना*\n\nप्रिय शेतकरी / FPO प्रतिनिधी,\nआपल्या परिसरात *12 किलो ताज्या टोमॅटोची* खरेदी मागणी आली आहे. कृपया पोर्टलवर आपला हमी दर सबमिट करा.",
        email: "सस्नेह नमस्कार,\n\nकिसानसेतू ॲडमिन कडून आपल्या निफाड क्लस्टरसाठी मागणी प्राप्त झाली आहे. कृपया दर कोटेशन सादर करावे.",
        voiceText: 'ऑडिओ व्हॉईस कॉल (मराठी): "नाशिक जिल्ह्यात 12 किलो टोमॅटोची मागणी आली आहे. कृपया आपला विक्री भाव पोर्टलवर नोंदवा."'
      }
    }
  };

  const currentTemplateGroup = multilingualTemplates[templateType] || multilingualTemplates.monthly_harvest;
  const activeLangData = currentTemplateGroup[language] || currentTemplateGroup.en || currentTemplateGroup.hi;
  
  const currentMsg = channel === 'voice' 
    ? (activeLangData.voiceText || activeLangData.sms) 
    : (activeLangData[channel] || activeLangData.sms);
  const currentSubject = activeLangData.subject || "[KisanSetu Notification]";

  const handleSendNotification = () => {
    setIsDispatched(true);
    confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    setTimeout(() => {
      alert(`Multilingual notification dispatched successfully via ${channel.toUpperCase()} in ${language.toUpperCase()} to ${recipientType.toUpperCase()}!`);
      setIsDispatched(false);
      onClose();
    }, 250);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '4px' }}>
              <Globe size={13} />
              <span>MULTILINGUAL · MULTI-CHANNEL DISPATCHER ENGINE</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#0f172a' }}>
              Dispatch Automated Notifications & Audio Voice Calls
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
          
          {/* Controls Bar: Channel, Recipient & Template */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            
            {/* 1. Channel Selector (4 Channels) */}
            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>Delivery Channel</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'sms' ? 'active' : ''}`}
                  onClick={() => setChannel('sms')}
                  style={{ padding: '6px 8px', fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  <MessageSquare size={13} />
                  <span>GSM SMS</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => setChannel('whatsapp')}
                  style={{ padding: '6px 8px', fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  <Smartphone size={13} />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'email' ? 'active' : ''}`}
                  onClick={() => setChannel('email')}
                  style={{ padding: '6px 8px', fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                >
                  <Mail size={13} />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'voice' ? 'active' : ''}`}
                  onClick={() => setChannel('voice')}
                  style={{ padding: '6px 8px', fontSize: '11.5px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', background: channel === 'voice' ? '#b45309' : undefined, borderColor: channel === 'voice' ? '#b45309' : undefined, color: channel === 'voice' ? '#fff' : undefined }}
                >
                  <PhoneCall size={13} />
                  <span>IVR Voice</span>
                </button>
              </div>
            </div>

            {/* 2. Notification Template */}
            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>Message Template</label>
              <select 
                className="form-select" 
                value={templateType} 
                onChange={(e) => setTemplateType(e.target.value)}
                style={{ fontSize: '12.5px', padding: '7px 10px' }}
              >
                <option value="monthly_harvest">📦 Monthly Harvest Stored in Packhouse</option>
                <option value="demand_inquiry">📢 District Produce Demand Inquiry</option>
              </select>
            </div>

            {/* 3. Target Recipients */}
            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>Target Recipients</label>
              <select 
                className="form-select" 
                value={recipientType} 
                onChange={(e) => setRecipientType(e.target.value)}
                style={{ fontSize: '12.5px', padding: '7px 10px' }}
              >
                <option value="farmers">🌾 Rural Farmers (SMS / 2G Phone)</option>
                <option value="fpo">🏢 FPO Packhouse Centers & Leads</option>
                <option value="consumers">🛒 Retail Consumers</option>
                <option value="companies">🏢 Corporate Bulk Buyers</option>
              </select>
            </div>
          </div>

          {/* Regional Languages Bar (8 Languages) */}
          <div>
            <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} color="#166534" />
              <span>Select Regional Language (प्रादेशिक भाषा निवडा / भाषा चुनें)</span>
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'mr', label: 'मराठी (Marathi)' },
                { id: 'gu', label: 'ગુજરાતી (Gujarati)' },
                { id: 'te', label: 'తెలుగు (Telugu)' },
                { id: 'ta', label: 'தமிழ் (Tamil)' },
                { id: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
                { id: 'bn', label: 'বাংলা (Bengali)' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  className={`persona-pill-btn ${language === lang.id ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.id)}
                  style={{
                    fontSize: '11.5px',
                    padding: '5px 10px',
                    fontWeight: language === lang.id ? '700' : '500'
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Audio Voice Recorder when in IVR Voice Channel */}
          {channel === 'voice' && (
            <div style={{
              background: '#fffbeb',
              border: '1.5px dashed #d97706',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={isRecordingAudio ? stopVoiceRecording : startVoiceRecording}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isRecordingAudio ? '#dc2626' : '#b45309',
                    color: '#ffffff',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(180, 83, 9, 0.25)',
                    animation: isRecordingAudio ? 'pulse 1s infinite' : 'none'
                  }}
                  title={isRecordingAudio ? "Stop recording voice note" : "Record voice note in regional language"}
                >
                  {isRecordingAudio ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <div>
                  <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: '#78350f' }}>
                    {isRecordingAudio ? `Recording Voice Memo (${audioSeconds}s / 10s)...` : hasRecordedAudio ? "Audio Voice Memo Recorded (10s)" : "Record Regional Voice Message"}
                  </h5>
                  <p style={{ margin: '2px 0 0', fontSize: '11.5px', color: '#92400e' }}>
                    {isRecordingAudio ? "Speak into microphone in selected language" : "Converts speech into automated IVR telephone call for non-smartphone farmers"}
                  </p>
                </div>
              </div>

              {hasRecordedAudio && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '16px', fontSize: '11.5px', fontWeight: '700' }}>
                  <Check size={14} />
                  <span>Audio Ready for Dispatch</span>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Interactive Channel Screen Simulator */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              LIVE MULTILINGUAL DISPATCH PREVIEW ({channel.toUpperCase()} · {language.toUpperCase()}):
            </span>

            {/* A. WhatsApp Simulator */}
            {channel === 'whatsapp' && (
              <div style={{
                background: '#075e54',
                borderRadius: '14px',
                padding: '16px',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(7, 94, 84, 0.25)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  marginBottom: '12px',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '12px', color: '#075e54' }}>
                      KS
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>KisanSetu National Dispatch Engine</div>
                      <div style={{ fontSize: '10px', opacity: 0.85 }}>Official WhatsApp Business API (Verified)</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', opacity: 0.85 }}>12:45 PM</span>
                </div>

                <div style={{
                  background: '#dcf8c6',
                  color: '#0f172a',
                  borderRadius: '10px',
                  borderTopLeftRadius: '2px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.55',
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {currentMsg}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <div style={{
                    background: '#25d366',
                    color: '#075e54',
                    padding: '5px 12px',
                    borderRadius: '14px',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Check size={14} />
                    <span>Verified Encrypted Payload</span>
                  </div>
                </div>
              </div>
            )}

            {/* B. GSM SMS Simulator */}
            {channel === 'sms' && (
              <div style={{
                background: '#1e293b',
                borderRadius: '14px',
                padding: '16px',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(30, 41, 59, 0.25)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                  marginBottom: '12px',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px', color: '#ffffff' }}>
                      SMS
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>Sender: VK-KISTAN (Telecom DLT Registered)</div>
                      <div style={{ fontSize: '10px', opacity: 0.75 }}>Offline 2G/Feature Phone Compatible</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', opacity: 0.75 }}>Just now</span>
                </div>

                <div style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '10px',
                  borderTopLeftRadius: '2px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {currentMsg}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                    DLT Principal Entity ID: 110155294821
                  </span>
                </div>
              </div>
            )}

            {/* C. Email Client Simulator */}
            {channel === 'email' && (
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #cbd5e1',
                borderRadius: '12px',
                padding: '18px 20px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
              }}>
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>From:</span>
                    <span style={{ fontSize: '12.5px', color: '#0f172a', fontWeight: '600' }}>KisanSetu National Dispatch &lt;dispatch@kisansetu.gov.in&gt;</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>To:</span>
                    <span style={{ fontSize: '12.5px', color: '#0f172a' }}>{recipientType.toUpperCase()} Regional Cluster Network</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b' }}>Subject:</span>
                    <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0369a1' }}>{currentSubject}</span>
                  </div>
                </div>

                <div style={{
                  fontSize: '13px',
                  lineHeight: '1.65',
                  color: '#334155',
                  whiteSpace: 'pre-line',
                  background: '#f8fafc',
                  padding: '16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #16a34a'
                }}>
                  {currentMsg}
                </div>
              </div>
            )}

            {/* D. IVR Voice Call Simulator */}
            {channel === 'voice' && (
              <div style={{
                background: '#451a03',
                borderRadius: '14px',
                padding: '16px',
                color: '#ffffff',
                boxShadow: '0 6px 20px rgba(69, 26, 3, 0.3)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.2)',
                  marginBottom: '12px',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                      <PhoneCall size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700' }}>KisanSetu Automated IVR Voice Broadcast Engine</div>
                      <div style={{ fontSize: '10px', opacity: 0.85 }}>Outbound Telephony Gateway (Telecom Registered)</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', opacity: 0.85 }}>Live Voice Call</span>
                </div>

                <div style={{
                  background: '#fef3c7',
                  color: '#78350f',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.55',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', marginBottom: '6px' }}>
                    <Volume2 size={16} color="#b45309" />
                    <span>Simulated Audio Playback Transcript ({language.toUpperCase()}):</span>
                  </div>
                  <em>{currentMsg}</em>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11px', color: '#fde68a' }}>
                  <span>Interactive Voice Response (Press 1 to confirm, Press 2 for Call Centre)</span>
                  <span>Audio Bitrate: 64kbps Opus</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: '#64748b' }}>
            Supported formats: GSM SMS, WhatsApp API, Official SMTP Email & IVR Voice
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn-primary" 
              style={{ background: '#16a34a', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={handleSendNotification}
              disabled={isDispatched}
            >
              <Send size={15} />
              <span>Dispatch {channel.toUpperCase()} ({language.toUpperCase()})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
