const truckTypes = ['10-Wheeler Wing Van', '12-Wheeler Wing Van', '6-Wheeler Closed Van', 'L300 Van', 'Others'];
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const attempts = new Map();

export function validateInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid inquiry.');
  const text = (key, max, required = false) => {
    const value = body[key] ?? '';
    if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) throw new Error(`Please check ${key}.`);
    if (required && !value.trim()) throw new Error('Please complete all required fields.');
    return value.trim();
  };
  const data = {
    inquiry: text('inquiry', 10, true), fullName: text('fullName', 120, true),
    company: text('company', 160), email: text('email', 254, true),
    phone: text('phone', 30, true),
  };
  if (!['Client', 'Partner'].includes(data.inquiry)) throw new Error('Please select an inquiry type.');
  if (!emailPattern.test(data.email) || /[\r\n]/.test(data.fullName)) throw new Error('Please check your name and email address.');
  if (!/^[+\d\s().-]{7,30}$/.test(data.phone)) throw new Error('Please enter a valid contact number.');
  if (data.inquiry === 'Client') data.message = text('message', 3000);
  else data.garageCity = text('garageCity', 120, true);
  if (!body.units || typeof body.units !== 'object' || Array.isArray(body.units)) throw new Error('Please select your trucks and quantities.');
  const entries = Object.entries(body.units);
  if (!entries.length || entries.length > truckTypes.length) throw new Error('Please select your trucks and quantities.');
  data.units = Object.fromEntries(entries.map(([type, qty]) => {
    if (!truckTypes.includes(type) || !['number', 'string'].includes(typeof qty) || !Number.isInteger(Number(qty)) || Number(qty) < 1 || Number(qty) > 9999) throw new Error('Truck quantities must be whole numbers from 1 to 9999.');
    return [type, Number(qty)];
  }));
  data.otherTruck = text('otherTruck', 120, 'Others' in data.units);
  return data;
}

const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[char]));

export function mailjetMessage(data, env) {
  const lines = [
    `${data.inquiry} inquiry — Alzhen Trucking Services`, '',
    `Full name: ${data.fullName}`, `Company: ${data.company || 'Not provided'}`,
    `Email: ${data.email}`, `Contact number: ${data.phone}`,
  ];
  if (data.inquiry === 'Partner') lines.push(`Garage location: ${data.garageCity}`);
  lines.push('', data.inquiry === 'Client' ? 'Trucks requested:' : 'Fleet:');
  for (const [type, qty] of Object.entries(data.units)) lines.push(`${type === 'Others' ? data.otherTruck : type}: ${qty}`);
  lines.push(`Total units: ${Object.values(data.units).reduce((sum, qty) => sum + qty, 0)}`);
  if (data.inquiry === 'Client') lines.push('', `Additional details: ${data.message || 'Not provided'}`);
  const rows = lines.slice(2).filter(Boolean).map(line => {
    const separator = line.indexOf(':');
    const label = separator < 0 ? line : line.slice(0, separator);
    const value = separator < 0 ? '' : line.slice(separator + 1).trim();
    return `<tr><td style="padding:12px;border-bottom:1px solid #e4eaf0;color:#526478;width:35%;vertical-align:top">${escapeHtml(label)}</td><td style="padding:12px;border-bottom:1px solid #e4eaf0;color:#15354f;white-space:pre-wrap;word-break:break-word">${escapeHtml(value)}</td></tr>`;
  }).join('');
  const html = `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif"><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="600" style="width:100%;max-width:600px;background:#fff;border-radius:12px;overflow:hidden" cellspacing="0" cellpadding="0"><tr><td style="background:#103859;padding:28px;color:white;border-bottom:5px solid #ffd04a"><div style="font-size:12px;letter-spacing:2px;color:#ffd04a">ALZHEN TRUCKING SERVICES</div><h1 style="font-size:25px;margin:12px 0 0">New ${data.inquiry.toLowerCase()} inquiry</h1></td></tr><tr><td style="padding:24px"><p style="color:#526478;line-height:1.6">A website visitor has submitted the following details.</p><table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px;line-height:1.6">${rows}</table><p style="margin-top:24px;font-size:14px;color:#526478">Use Reply in your email app to respond directly to the person who submitted this inquiry.</p></td></tr><tr><td style="padding:18px 24px;background:#eef3f7;font-size:12px;color:#526478">Alzhen Website · ${data.inquiry} Inquiry</td></tr></table></td></tr></table></body></html>`;
  return { Messages: [{
    From: { Email: env.MAILJET_FROM_EMAIL, Name: 'Alzhen Website' },
    To: [{ Email: env.INQUIRY_TO_EMAIL }],
    ReplyTo: { Email: data.email, Name: data.fullName },
    Subject: `Alzhen Website — ${data.inquiry} Inquiry`,
    TextPart: lines.join('\n'),
    HTMLPart: html,
  }] };
}

export default async function handler(req, res, env = process.env) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({error: 'Method not allowed.'}); }
  const origin = req.headers.origin;
  const allowed = ['https://alzhen-website.vercel.app', env.INQUIRY_SITE_ORIGIN];
  if (process.env.NODE_ENV === 'development') allowed.push('http://localhost:3000', 'http://127.0.0.1:3000');
  if (origin && !allowed.includes(origin)) return res.status(403).json({error: 'Please submit from the Alzhen website.'});
  if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({error: 'Invalid request format.'});
  if (Number(req.headers['content-length']) > 16000) return res.status(413).json({error: 'Inquiry is too long.'});
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (JSON.stringify(body)?.length > 16000) return res.status(413).json({error: 'Inquiry is too long.'});
  } catch { return res.status(400).json({error: 'Invalid inquiry.'}); }
  let data;
  try { data = validateInquiry(body); }
  catch (error) { return res.status(400).json({error: error.message}); }
  if (!env.MAILJET_API_KEY || !env.MAILJET_SECRET_KEY || !emailPattern.test(env.MAILJET_FROM_EMAIL || '') || !emailPattern.test(env.INQUIRY_TO_EMAIL || '')) {
    return res.status(503).json({error: process.env.NODE_ENV === 'development'
      ? 'Local email setup is incomplete. Add your Mailjet credentials and sender/recipient emails to .env.local, then restart npm run dev.'
      : 'Online inquiries are temporarily unavailable. Please contact us by phone or email.'});
  }
  // Best-effort per-instance throttling; use hosting firewall rules for a shared limit.
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0];
  const limit = attempts.get(ip) || {count: 0, expires: now + 60000};
  if (limit.count >= 3) { res.setHeader('Retry-After', '60'); return res.status(429).json({error: 'Please wait a minute before submitting another inquiry.'}); }
  limit.count++; attempts.set(ip, limit);
  try {
    const authorization = `Basic ${Buffer.from(`${env.MAILJET_API_KEY}:${env.MAILJET_SECRET_KEY}`).toString('base64')}`;
    const senderResponse = await fetch('https://api.mailjet.com/v3/REST/sender?Limit=1000', {
      headers: {Authorization: authorization}, signal: AbortSignal.timeout(8000),
    });
    const senders = await senderResponse.json();
    if (!senderResponse.ok) throw new Error('Unable to check sender.');
    const sender = senders.Data?.find(item => item.Email?.toLowerCase() === env.MAILJET_FROM_EMAIL.toLowerCase());
    if (sender?.Status !== 'Active') return res.status(503).json({error: process.env.NODE_ENV === 'development'
      ? 'Mailjet sender is not verified yet. Activate the sender email in Mailjet → Senders & Domains before submitting.'
      : 'Online inquiries are temporarily unavailable. Please contact us by phone or email.'});
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      }, body: JSON.stringify(mailjetMessage(data, env)), signal: AbortSignal.timeout(12000),
    });
    const result = await response.json();
    if (!response.ok || result.Messages?.[0]?.Status !== 'success') throw new Error('Mail service rejected the inquiry.');
    return res.status(200).json({ok: true, status: 'accepted'});
  } catch {
    return res.status(502).json({error: 'We could not confirm your inquiry was sent. Please contact us by phone or email before trying again.'});
  }
}
