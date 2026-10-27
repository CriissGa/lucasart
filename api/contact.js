import nodemailer from 'nodemailer';

const recipient = 'info@lucastaylorphotography.com';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Browser submissions must come from the site hosting this function.
  try {
    if (!req.headers.origin || new URL(req.headers.origin).host !== req.headers.host) {
      return res.status(403).json({ error: 'Please send your message from the contact page.' });
    }
  } catch {
    return res.status(403).json({ error: 'Invalid origin.' });
  }
  if (!req.headers['content-type']?.startsWith('application/json')) {
    return res.status(415).json({ error: 'Expected JSON.' });
  }
  let data = req.body;
  try {
    if (typeof data === 'string') data = JSON.parse(data);
  } catch {
    return res.status(400).json({ error: 'Invalid message.' });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Invalid message.' });
  }
  if (data.website) return res.status(200).json({ ok: true });

  const limits = { 'first-name': 100, 'last-name': 100, email: 254, subject: 200, message: 5000 };
  for (const [field, limit] of Object.entries(limits)) {
    if (typeof data[field] !== 'string' || !data[field].trim() || data[field].length > limit) {
      return res.status(400).json({ error: 'Please complete all fields within the allowed length.' });
    }
    data[field] = data[field].trim();
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) ||
      ['first-name', 'last-name', 'subject'].some((field) => /[\r\n\x00]/.test(data[field]))) {
    return res.status(400).json({ error: 'Please check your name, email and subject.' });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    return res.status(503).json({ error: 'Email is temporarily unavailable. Please email info@lucastaylorphotography.com directly.' });
  }
  const transport = nodemailer.createTransport({
    host: 'smtp.purelymail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  try {
    const result = await transport.sendMail({
      from: { name: 'Lucas Taylor Photography', address: recipient },
      to: recipient,
      replyTo: { name: `${data['first-name']} ${data['last-name']}`, address: data.email },
      subject: `[Website contact] ${data.subject}`,
      text: `Name: ${data['first-name']} ${data['last-name']}\nEmail: ${data.email}\n\n${data.message}`,
      disableFileAccess: true,
      disableUrlAccess: true,
    });
    if (!result.accepted?.length) throw new Error('Recipient rejected');
    return res.status(200).json({ ok: true });
  } catch {
    // Do not log credentials or visitor messages.
    console.error('Contact email delivery failed.');
    return res.status(502).json({ error: 'Your message could not be sent. Please try again or email info@lucastaylorphotography.com directly.' });
  } finally {
    transport.close();
  }
}
