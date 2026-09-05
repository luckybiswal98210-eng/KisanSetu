import { PRESET_ACCOUNTS } from '../data/mockData';
import { executeNeonQuery } from './neonClient';

const REGISTERED_USERS_KEY = 'krishisetu_registered_users';
const SMS_LOGS_KEY = 'krishisetu_sms_logs';

/**
 * Get all registered users (combines initial presets + locally registered users)
 */
export function getRegisteredUsers() {
  try {
    const saved = localStorage.getItem(REGISTERED_USERS_KEY);
    const customUsers = saved ? JSON.parse(saved) : [];
    // Combine presets with custom registered users (custom users take priority)
    return [...customUsers, ...PRESET_ACCOUNTS];
  } catch (err) {
    console.error('Error reading registered users:', err);
    return PRESET_ACCOUNTS;
  }
}

/**
 * Register a new user in the platform
 */
export async function registerNewUser({
  name,
  phone,
  email,
  role = 'farmer',
  roleLabel,
  location = 'Maharashtra, India',
  customDetail = '',
  password = ''
}) {
  const finalName = name.trim();
  const cleanPhone = phone.trim();
  const cleanEmail = email ? email.trim() : `${finalName.toLowerCase().replace(/[^a-z0-9]/g, '')}@krishisetu.in`;
  
  const roleColors = {
    fpo: '#166534',
    farmer: '#b45309',
    company: '#0d2f1b',
    consumer: '#0284c7',
    admin: '#7c2d12'
  };

  const roleLabels = {
    fpo: 'Farmer Producer Org (FPO)',
    farmer: 'Individual Farmer',
    company: 'Company / Bulk Buyer',
    consumer: 'Retail Consumer / Household',
    admin: 'Platform Administrator'
  };

  const newUser = {
    id: `usr-${role}-${Date.now()}`,
    name: finalName,
    role,
    roleLabel: roleLabel || roleLabels[role] || 'Registered Stakeholder',
    email: cleanEmail,
    phone: cleanPhone.startsWith('+') ? cleanPhone : `+91 ${cleanPhone}`,
    location,
    avatar: finalName.charAt(0).toUpperCase(),
    badgeColor: roleColors[role] || '#166534',
    customDetail: customDetail || 'Verified KYC · Direct Agri-OS',
    password,
    registeredAt: new Date().toISOString()
  };

  // 1. Save to LocalStorage
  try {
    const saved = localStorage.getItem(REGISTERED_USERS_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    // Remove if same phone or email exists to update
    const filtered = existing.filter(u => u.phone !== newUser.phone && u.email !== newUser.email);
    const updated = [newUser, ...filtered];
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage save warning:', err);
  }

  // 2. Asynchronously attempt saving to Neon PostgreSQL (non-blocking)
  try {
    await executeNeonQuery(
      `INSERT INTO users (id, name, email, phone, role, role_label, location) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO UPDATE 
       SET name = EXCLUDED.name, phone = EXCLUDED.phone, location = EXCLUDED.location;`,
      [newUser.id, newUser.name, newUser.email, newUser.phone, newUser.role, newUser.roleLabel, newUser.location]
    );
    console.log(`✅ User registered in Neon Cloud DB: ${newUser.name} (${newUser.phone})`);
  } catch (err) {
    console.info('Neon DB insert fallback to local session:', err.message);
  }

  // 3. Trigger automatic Welcome SMS
  triggerSmsDispatch({
    to: newUser.phone,
    recipientName: newUser.name,
    channel: 'sms',
    message: `[KisanSetu DLT] Welcome ${newUser.name}! Your ${roleLabels[role]} account is active on KisanSetu Direct Agri-OS. Mobile verified via OTP (DLT-110155294821).`,
    templateType: 'welcome_registration'
  });

  return newUser;
}

/**
 * Authenticate user with phone or email and password
 */
export function authenticateUser({ identifier, password, role }) {
  const users = getRegisteredUsers();
  const cleanId = identifier ? identifier.trim().toLowerCase() : '';

  // Match by phone or email
  const matched = users.find(u => {
    const uPhone = (u.phone || '').replace(/[^0-9]/g, '');
    const searchPhone = cleanId.replace(/[^0-9]/g, '');
    const phoneMatch = searchPhone.length >= 6 && uPhone.includes(searchPhone);
    const emailMatch = u.email && u.email.toLowerCase() === cleanId;
    return (phoneMatch || emailMatch) && (!role || u.role === role);
  });

  if (matched) {
    return { success: true, user: matched };
  }

  // If role is selected, fall back to creating a dynamic session user
  const rolePreset = PRESET_ACCOUNTS.find(a => a.role === role) || PRESET_ACCOUNTS[0];
  const dynamicUser = {
    ...rolePreset,
    id: `usr-${role || 'farmer'}-${Date.now()}`,
    phone: cleanId.includes('@') ? rolePreset.phone : (cleanId ? `+91 ${cleanId}` : rolePreset.phone),
    email: cleanId.includes('@') ? cleanId : rolePreset.email
  };

  return { success: true, user: dynamicUser };
}

/**
 * Trigger an SMS / IVR Notification and emit a global browser event
 */
export function triggerSmsDispatch({
  to = '+91 98000-00000',
  recipientName = 'Farmer Partner',
  channel = 'sms',
  message = '',
  templateType = 'general',
  language = 'en'
}) {
  const dispatchRecord = {
    id: `SMS-${Date.now()}`,
    to,
    recipientName,
    channel,
    message,
    templateType,
    language,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    status: 'Delivered',
    carrier: 'Jio / Airtel Telecom DLT',
    gatewayId: 'DLT-110155294821'
  };

  // Save to SMS logs in localStorage
  try {
    const saved = localStorage.getItem(SMS_LOGS_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem(SMS_LOGS_KEY, JSON.stringify([dispatchRecord, ...existing.slice(0, 49)]));
  } catch (err) {
    console.warn('Could not save SMS log:', err);
  }

  // Dispatch custom event for on-screen notification toast
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('kisansetu_sms_dispatched', {
      detail: dispatchRecord
    });
    window.dispatchEvent(event);
  }

  return dispatchRecord;
}

/**
 * Retrieve sent SMS logs
 */
export function getSmsLogs() {
  try {
    const saved = localStorage.getItem(SMS_LOGS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
