import React, { useState, useEffect } from 'react';
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
  PhoneCall,
  History,
  ExternalLink,
  ShieldCheck,
  PhoneForwarded
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { triggerSmsDispatch, getSmsLogs } from '../../lib/authService';

export default function SmsSimulatorModal({ isOpen, onClose, smsTarget }) {
  if (!isOpen) return null;

  const [channel, setChannel] = useState('sms'); // default to 'sms'
  const [language, setLanguage] = useState('hi');
  const [templateType, setTemplateType] = useState('monthly_harvest');
  const [recipientType, setRecipientType] = useState('farmers');
  const [isDispatched, setIsDispatched] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [smsLogs, setSmsLogs] = useState([]);

  // Recipient info
  const [targetPhone, setTargetPhone] = useState(smsTarget?.phone || '+91 94230-58192');
  const [targetName, setTargetName] = useState(smsTarget?.name || 'Balasaheb Jadhav (Farmer)');
  
  // Custom editable message
  const [customText, setCustomText] = useState('');

  // Voice Recording State
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);
  const [hasRecordedAudio, setHasRecordedAudio] = useState(false);

  useEffect(() => {
    setSmsLogs(getSmsLogs());
  }, [isOpen]);

  useEffect(() => {
    if (smsTarget && typeof smsTarget === 'object' && !smsTarget.nativeEvent) {
      if (typeof smsTarget.phone === 'string') setTargetPhone(smsTarget.phone);
      if (typeof smsTarget.name === 'string') setTargetName(smsTarget.name);
    }
  }, [smsTarget]);

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

  const safeTargetName = (typeof targetName === 'string' && targetName.trim()) ? targetName.trim() : 'Balasaheb Jadhav';
  const firstName = safeTargetName.split(' ')[0] || safeTargetName;

  const multilingualTemplates = {
    monthly_harvest: {
      en: {
        subject: "[KisanSetu] Monthly Produce Stored & Packhouse Inventory Summary",
        sms: `[KisanSetu Alert] Dear ${firstName}, Monthly Harvest Stored: 4,500 kg Grade-A Roma Tomatoes & 3,200 kg Nashik Red Onions ready at Niphad Packhouse Hub. Guaranteed Rate: Rs 23.80/kg. Escrow Vault Active.`,
        whatsapp: `📦 *KisanSetu Monthly Harvest & Packhouse Stock Report*\n\nDear ${safeTargetName},\nFresh monthly harvest batches have been verified and stored in the central regional packhouse:\n\n• *Grade-A Roma Tomatoes:* 4,500 kg (450 crates)\n• *Nashik Red Onions (55mm):* 3,200 kg\n• *Packhouse Location:* Niphad Hub, Nashik\n• *Escrow Secured Price:* ₹23.80/kg (Direct Bank Credit)\n\nAvailable for immediate distribution and procurement allocation.`,
        email: `Dear ${safeTargetName},\n\nWe are pleased to inform you that the monthly farm harvest aggregation for September 2026 has been successfully verified and stored at the Niphad Packhouse Hub.\n\nSummary of Stored Batches:\n- Produce: Grade-A Roma Tomatoes (4,500 kg) & Nashik Red Onions (3,200 kg)\n- Storage Conditions: Pre-cooled to 2°C with humidity-controlled atmosphere\n- Quality Certification: Verified by Local FPO Field Inspector\n- Direct Payout Protection: 100% Guaranteed via KisanSetu Escrow Vault\n\nLog in to your KisanSetu dashboard to view allocation status or request dispatch.\n\nWarm regards,\nKisanSetu National Procurement OS Team`,
        voiceText: `Audio Voice Call (English): "Hello ${firstName}! This is KisanSetu Automated Field Dispatch. Your monthly batch of 4,500 kg Grade-A Tomatoes is safely stored at Niphad Packhouse with guaranteed rate Rs 23.80/kg. Press 1 to confirm dispatch."`
      },
      hi: {
        subject: "[किसानसेतु] मासिक उत्पाद भंडारण एवं पैकहाउस इन्वेंटरी रिपोर्ट",
        sms: `[किसानसेतु अलर्ट] प्रिय ${firstName} जी, मासिक फसल भंडारण: 4,500 किलो ग्रेड-ए टमाटर और 3,200 किलो नासिक प्याज निफाड़ पैकहाउस में सुरक्षित। निश्चित दर: ₹23.80/किलो। एस्क्रो भुगतान सक्रिय।`,
        whatsapp: `📦 *किसानसेतु मासिक फसल भंडारण एवं पैकहाउस रिपोर्ट*\n\nप्रिय ${safeTargetName} एवं हितधारक,\nसितंबर 2026 की मासिक ताज़ा फसल का सत्यापन कर निफाड़ केंद्रीय पैकहाउस में भंडारण कर दिया गया है:\n\n• *ग्रेड-ए रोमा टमाटर:* 4,500 किलो (450 क्रेट)\n• *नासिक लाल प्याज:* 3,200 किलो\n• *भंडारण केंद्र:* निफाड़ हब, नासिक\n• *सुरक्षित एस्क्रो दर:* ₹23.80/किलो (सीधे बैंक खाते में)\n\nयह स्टॉक तत्काल आवंटन एवं थोक आपूर्ति के लिए उपलब्ध है।`,
        email: `नमस्ते ${safeTargetName},\n\nकिसानसेतु प्लेटफॉर्म के माध्यम से सूचित किया जाता है कि नासिक जिले के निफाड़ पैकहाउस में मासिक फसल का सुरक्षित भंडारण पूरा हो चुका है।\n\nभंडारित फसल विवरण:\n- टमाटर (ग्रेड-ए): 4,500 किलो | प्याज: 3,200 किलो\n- तापमान व गुणवत्ता: प्री-कूल्ड (2°C) नियंत्रित वातावरण\n- भुगतान सुरक्षा: किसानसेतु एस्क्रो वॉल्ट द्वारा शत-प्रतिशत सुरक्षित\n\nसादर,\nकिसानसेतु राष्ट्रीय खरीद अवसंरचना`,
        voiceText: `ऑडियो वॉयस संदेश (हिन्दी): "नमस्ते ${firstName} जी! किसानसेतु स्वचालित वॉयस संदेश। आपकी 4,500 किलो टमाटर की फसल निफाड़ पैकहाउस में ₹23.80 प्रति किलो की सुरक्षित दर पर जमा हो गई है। डिलीवरी पुष्टि के लिए 1 दबाएं।"`
      },
      mr: {
        subject: "[किसानसेतू] मासिक शेतमाल साठा व पॅकहाऊस अहवाल",
        sms: `[किसानसेतू अलर्ट] सस्नेह नमस्कार ${firstName}, मासिक शेतमाल साठा: 4,500 किलो टोमॅटो आणि 3,200 किलो कांदा निफाड पॅकहाऊसमध्ये सुरक्षित. हमी भाव: ₹23.80/किलो. थेट बँक खात्यात एस्क्रो जमा.`,
        whatsapp: `📦 *किसानसेतू मासिक शेतमाल साठा व थेट संकलन अहवाल*\n\nनमस्कार ${safeTargetName},\nसप्टेंबर 2026 मधील ताज्या शेतमालाची प्रतवारी पूर्ण करून निफाड मध्यवर्ती पॅकहाऊसमध्ये सुरक्षित साठवणूक करण्यात आली आहे:\n\n• *उत्कृष्ट रोमा टोमॅटो:* 4,500 किलो (450 क्रेट)\n• *नाशिक लाल कांदा:* 3,200 किलो\n• *संकलन केंद्र:* निफाड ॲग्री हब\n• *हमी थेट दर:* ₹23.80 / किलो (दलाली विरहित)\n\nहा साठा त्वरित वितरण व वितरणासाठी सज्ज आहे.`,
        email: `सस्नेह नमस्कार ${safeTargetName},\n\nकिसानसेतू डिजिटल प्रणालीद्वारे कळविण्यात येते की, नासिक जिल्ह्यातील निफाड केंद्रावर चालू महिन्यातील शेतमालाची गुणवत्ता तपासणी व साठवणूक यशस्वीरीत्या पूर्ण झाली आहे.\n\nआपला नम्र,\nकिसानसेतू कृषी व्यवस्थापन कक्ष`,
        voiceText: `ऑडिओ व्हॉईस कॉल (मराठी): "नमस्कार ${firstName}! किसानसेतू व्हॉईस प्रणाली. आपला 4,500 किलो टोमॅटो माल निफाड केंद्रावर हमी भाव ₹23.80 ने साठवला गेला आहे. पुष्टीसाठी 1 दाबा."`
      }
    },
    demand_inquiry: {
      en: {
        subject: "[KisanSetu Demand Inquiry] State & District Produce Availability Check",
        sms: `[KisanSetu Inquiry] Urgent Purchase Order for 12 kg Tomatoes in Nashik District. Dear ${firstName}, please confirm ready stock and submit price quote via FPO portal.`,
        whatsapp: `📢 *KisanSetu Demand Broadcast Alert*\n\nDear ${safeTargetName},\nAn active purchase demand has been received for *Roma Tomatoes (12 kg)* in your district:\n\n• *Target Area:* Maharashtra > Nashik\n• *Buyer Type:* Verified Retail Consumer\n• *Action Required:* Submit your farm-gate supply quotation (₹/kg) on your portal.`,
        email: `Dear ${safeTargetName},\n\nA new produce inquiry has been broadcasted by Platform Admin for your district. Please inspect the quantity requirements and submit your price quote to proceed with logistics allocation.`,
        voiceText: `Audio IVR Call (English): "Urgent demand broadcast: 12 kg Tomatoes requested in Nashik district. Please open your FPO portal and submit your price quote."`
      },
      hi: {
        subject: "[किसानसेतु मांग सूचना] जिलावार फसल उपलब्धता एवं मूल्य कोटेशन",
        sms: `[किसानसेतु जांच] प्रिय ${firstName} जी, नासिक जिले में 12 किलो टमाटर की खरीद मांग आई है। कृपया एफपीओ पोर्टल पर अपनी दर (कोटेशन) दर्ज करें।`,
        whatsapp: `📢 *किसानसेतु मांग प्रसारण अलर्ट*\n\nप्रिय ${safeTargetName},\nआपके जिले में *12 किलो रोमा टमाटर* की ताजा मांग प्राप्त हुई है:\n\n• *स्थान:* महाराष्ट्र > नासिक (निफाड़)\n• *खरीदार:* सत्यापित घरेलू उपभोक्ता\n• *कार्रवाई:* अपने पोर्टल पर अपना आपूर्ति मूल्य (₹/किलो) दर्ज कर भेजें।`,
        email: `नमस्ते ${safeTargetName},\n\nकिसानसेतु एडमिन द्वारा आपके क्षेत्र के लिए उत्पाद उपलब्धता की जांच भेजी गई है। कृपया पोर्टल पर लॉगिन कर अपनी दर सबमिट करें।`,
        voiceText: `ऑडियो वॉयस संदेश (हिन्दी): "नासिक जिले में 12 किलो टमाटर की नई खरीद मांग आई है। कृपया अपने पोर्टल पर जाकर दर दर्ज करें।"`
      },
      mr: {
        subject: "[किसानसेतू मागणी चौकशी] जिल्हास्तरीय शेतमाल मागणी व दर",
        sms: `[किसानसेतू चौकशी] नमस्कार ${firstName}, नाशिक जिल्ह्यात 12 किलो टोमॅटोची मागणी आली आहे. कृपया पोर्टलवर आपला विक्री दर नोंदवा.`,
        whatsapp: `📢 *किसानसेतू थेट मागणी सूचना*\n\nप्रिय ${safeTargetName},\nआपल्या परिसरात *12 किलो ताज्या टोमॅटोची* खरेदी मागणी आली आहे. कृपया पोर्टलवर आपला हमी दर सबमिट करा.`,
        email: `सस्नेह नमस्कार ${safeTargetName},\n\nकिसानसेतू ॲडमिन कडून आपल्या निफाड क्लस्टरसाठी मागणी प्राप्त झाली आहे. कृपया दर कोटेशन सादर करावे.`,
        voiceText: `ऑडिओ व्हॉईस कॉल (मराठी): "नाशिक जिल्ह्यात 12 किलो टोमॅटोची मागणी आली आहे. कृपया आपला विक्री भाव पोर्टलवर नोंदवा."`
      }
    }
  };

  const currentTemplateGroup = multilingualTemplates[templateType] || multilingualTemplates.monthly_harvest;
  const activeLangData = currentTemplateGroup[language] || currentTemplateGroup.en || currentTemplateGroup.hi;
  
  const generatedMsg = channel === 'voice' 
    ? (activeLangData.voiceText || activeLangData.sms) 
    : (activeLangData[channel] || activeLangData.sms);

  const finalMessage = customText.trim() || generatedMsg;
  const currentSubject = activeLangData.subject || "[KisanSetu Notification]";

  // Quick preset contacts
  const presetContacts = [
    { label: '🌾 Balasaheb (Farmer)', name: 'Balasaheb Jadhav', phone: '+91 94230-58192' },
    { label: '🏢 Niphad FPO Center', name: 'Niphad Packhouse Lead', phone: '+91 98220-11234' },
    { label: '🛒 Priya (Consumer)', name: 'Priya Sharma', phone: '+91 98765-43210' },
    { label: '🚛 Truck Driver (MH-15)', name: 'Santosh Shinde', phone: '+91 98231-90412' }
  ];

  const handleSelectPreset = (p) => {
    setTargetName(p.name);
    setTargetPhone(p.phone);
  };

  const handleSendNotification = () => {
    setIsDispatched(true);
    setDispatchStatus('Encrypting payload & routing via Telecom DLT Gateway (Jio/Airtel)...');

    setTimeout(() => {
      // Trigger the real SMS dispatch and notification event
      const dispatchedRecord = triggerSmsDispatch({
        to: targetPhone,
        recipientName: targetName,
        channel,
        message: finalMessage,
        templateType,
        language
      });

      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
      setDispatchStatus(`✓ Successfully Delivered to ${targetPhone} via DLT Route (Carrier: Jio/Airtel)`);
      setSmsLogs(getSmsLogs());

      setTimeout(() => {
        setIsDispatched(false);
      }, 3000);
    }, 700);
  };

  // Trigger Native SMS app on mobile/desktop
  const handleOpenNativeSms = () => {
    const cleanNumber = targetPhone.replace(/[^0-9+]/g, '');
    const smsUrl = `sms:${cleanNumber}?body=${encodeURIComponent(finalMessage)}`;
    window.open(smsUrl, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" style={{ maxWidth: '820px', maxHeight: '92vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', background: '#0d2f1b', color: '#ffffff', borderRadius: '16px 16px 0 0' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1e5e36', color: '#55efc4', padding: '3px 8px', borderRadius: '4px', fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: '700', marginBottom: '4px' }}>
              <Radio size={13} color="#55efc4" />
              <span>LIVE TELECOM DLT · MULTI-CHANNEL SMS & VOICE DISPATCHER</span>
            </div>
            <h3 style={{ margin: 0, fontSize: '19px', fontWeight: '800', color: '#ffffff' }}>
              Dispatch Real-Time SMS, WhatsApp & IVR Voice Alerts
            </h3>
          </div>
          <button className="modal-close-btn" style={{ color: '#a7f3d0' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: '20px 24px' }}>
          
          {/* Recipient Phone & Name Target Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #cbd5e1',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Recipient Phone & Destination
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} color="#15803d" />
                <span style={{ fontSize: '11px', color: '#15803d', fontWeight: '700' }}>DLT Entity: VK-KISTAN (Verified)</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label" style={{ fontSize: '11.5px', fontWeight: '700', marginBottom: '4px' }}>
                  Target Mobile Number (Enter your phone to receive SMS)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+91 98XXX-XXXXX"
                    value={targetPhone}
                    onChange={(e) => setTargetPhone(e.target.value)}
                    style={{ fontWeight: '700', fontFamily: 'JetBrains Mono, monospace', fontSize: '13.5px', paddingLeft: '34px' }}
                  />
                  <Smartphone size={16} color="#64748b" style={{ position: 'absolute', left: '10px', top: '12px' }} />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: '11.5px', fontWeight: '700', marginBottom: '4px' }}>
                  Recipient Name / Organization
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Balasaheb Jadhav"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  style={{ fontSize: '13px' }}
                />
              </div>
            </div>

            {/* Quick-fill preset buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Quick Presets:</span>
              {presetContacts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(p)}
                  style={{
                    background: targetPhone === p.phone ? '#dcfce7' : '#ffffff',
                    border: targetPhone === p.phone ? '1.5px solid #16a34a' : '1px solid #cbd5e1',
                    color: targetPhone === p.phone ? '#14532d' : '#475569',
                    fontSize: '11px',
                    fontWeight: targetPhone === p.phone ? '700' : '500',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

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
                  style={{ padding: '8px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <MessageSquare size={14} />
                  <span>GSM SMS</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'whatsapp' ? 'active' : ''}`}
                  onClick={() => setChannel('whatsapp')}
                  style={{ padding: '8px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Smartphone size={14} />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'email' ? 'active' : ''}`}
                  onClick={() => setChannel('email')}
                  style={{ padding: '8px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                  <Mail size={14} />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  className={`persona-pill-btn ${channel === 'voice' ? 'active' : ''}`}
                  onClick={() => setChannel('voice')}
                  style={{ padding: '8px 10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: channel === 'voice' ? '#b45309' : undefined, borderColor: channel === 'voice' ? '#b45309' : undefined, color: channel === 'voice' ? '#fff' : undefined }}
                >
                  <PhoneCall size={14} />
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
                onChange={(e) => {
                  setTemplateType(e.target.value);
                  setCustomText(''); // Reset custom edit to show new template
                }}
                style={{ fontSize: '12.5px', padding: '8px 10px' }}
              >
                <option value="monthly_harvest">📦 Monthly Harvest Stored in Packhouse</option>
                <option value="demand_inquiry">📢 District Produce Demand Inquiry</option>
              </select>
            </div>

            {/* 3. Target Audience Group */}
            <div>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12px' }}>Target Group</label>
              <select 
                className="form-select" 
                value={recipientType} 
                onChange={(e) => setRecipientType(e.target.value)}
                style={{ fontSize: '12.5px', padding: '8px 10px' }}
              >
                <option value="farmers">🌾 Rural Farmers (GSM SMS / 2G Phone)</option>
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
              <span>Select Language (प्रादेशिक भाषा निवडा / भाषा चुनें)</span>
            </label>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {[
                { id: 'en', label: 'English' },
                { id: 'hi', label: 'हिन्दी (Hindi)' },
                { id: 'mr', label: 'मराठी (Marathi)' }
              ].map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  className={`persona-pill-btn ${language === lang.id ? 'active' : ''}`}
                  onClick={() => {
                    setLanguage(lang.id);
                    setCustomText('');
                  }}
                  style={{
                    fontSize: '11.5px',
                    padding: '6px 12px',
                    fontWeight: language === lang.id ? '700' : '500'
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Editable SMS / Message Content Area */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="form-label" style={{ fontSize: '12px', fontWeight: '700', margin: 0 }}>
                Message Payload Preview (Editable)
              </label>
              <span className="mono" style={{ fontSize: '11px', color: '#64748b' }}>
                {finalMessage.length} characters · ~{Math.ceil(finalMessage.length / 160)} SMS Parts
              </span>
            </div>
            <textarea
              className="form-input"
              rows={4}
              value={customText || generatedMsg}
              onChange={(e) => setCustomText(e.target.value)}
              style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '13px',
                lineHeight: '1.5',
                padding: '12px'
              }}
            />
          </div>

          {/* Live Smartphone / Channel Visual Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>
              Device Reception Simulation:
            </span>

            {/* GSM SMS Preview */}
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
                      <div style={{ fontWeight: '700' }}>Sender: VK-KISTAN (Govt Telecom DLT)</div>
                      <div style={{ fontSize: '10.5px', opacity: 0.8 }}>To: {targetPhone} ({targetName})</div>
                    </div>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', opacity: 0.75 }}>Just now</span>
                </div>

                <div style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line'
                }}>
                  {finalMessage}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11px', color: '#94a3b8' }}>
                  <span>DLT Principal Entity ID: 110155294821</span>
                  <span>Carrier: Airtel / Jio GSM</span>
                </div>
              </div>
            )}

            {/* WhatsApp Preview */}
            {channel === 'whatsapp' && (
              <div style={{
                background: '#075e54',
                borderRadius: '14px',
                padding: '16px',
                color: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '800' }}>
                      WA
                    </div>
                    <strong>KisanSetu Official Business</strong>
                  </div>
                  <span style={{ fontSize: '11px', opacity: 0.8 }}>Encrypted Payload</span>
                </div>

                <div style={{
                  background: '#ffffff',
                  color: '#0f172a',
                  borderRadius: '10px',
                  padding: '14px 16px',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line'
                }}>
                  {finalMessage}
                </div>
              </div>
            )}

            {/* Email Preview */}
            {channel === 'email' && (
              <div style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                  <div><strong>From:</strong> dispatch@kisansetu.gov.in</div>
                  <div><strong>To:</strong> {targetName} &lt;{targetPhone}@sms.kisansetu.in&gt;</div>
                  <div><strong>Subject:</strong> {currentSubject}</div>
                </div>
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '12.5px', whiteSpace: 'pre-line' }}>
                  {finalMessage}
                </div>
              </div>
            )}

            {/* IVR Voice Call Preview */}
            {channel === 'voice' && (
              <div style={{
                background: '#451a03',
                borderRadius: '14px',
                padding: '16px',
                color: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PhoneCall size={18} color="#d97706" />
                    <strong>Automated IVR Outbound Call to {targetPhone}</strong>
                  </div>
                  <span className="mono" style={{ fontSize: '11px', color: '#fde68a' }}>Opus 64kbps</span>
                </div>
                <div style={{ background: '#fef3c7', color: '#78350f', borderRadius: '10px', padding: '14px', fontSize: '13px' }}>
                  <em>"{finalMessage}"</em>
                </div>
              </div>
            )}
          </div>

          {/* Dispatch Status Confirmation Alert */}
          {dispatchStatus && (
            <div style={{
              background: '#f0fdf4',
              border: '1.5px solid #86efac',
              borderRadius: '10px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#14532d',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              <CheckCircle2 size={18} color="#15803d" />
              <span>{dispatchStatus}</span>
            </div>
          )}

          {/* Dispatched SMS Logs Drawer */}
          {smsLogs.length > 0 && (
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0284c7',
                    fontWeight: '700',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: 0
                  }}
                >
                  <History size={14} />
                  <span>{showHistory ? 'Hide Sent SMS Logs' : `View Dispatched SMS Logs (${smsLogs.length} Records)`}</span>
                </button>
              </div>

              {showHistory && (
                <div style={{
                  maxHeight: '180px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  background: '#f8fafc',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0'
                }}>
                  {smsLogs.map((log) => (
                    <div key={log.id} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '11.5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <strong style={{ color: '#0f172a' }}>{log.to} ({log.recipientName})</strong>
                        <span style={{ color: '#15803d', fontWeight: '700' }}>✓ {log.status} ({log.timestamp})</span>
                      </div>
                      <div style={{ color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {log.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleOpenNativeSms}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}
            title="Open default phone Messages application with pre-filled text"
          >
            <ExternalLink size={14} />
            <span>Open in Phone Messages</span>
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              type="button" 
              className="btn-primary" 
              style={{ background: '#16a34a', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', fontSize: '13px' }}
              onClick={handleSendNotification}
              disabled={isDispatched}
            >
              <Send size={15} />
              <span>{isDispatched ? 'Sending via DLT...' : `Dispatch ${channel.toUpperCase()} to ${targetPhone}`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
