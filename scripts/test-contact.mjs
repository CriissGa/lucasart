import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import handler from '../src/lib/contact-handler.js';

// Exercise delivery without sending any real email or requiring secrets.
const originalTransport = nodemailer.createTransport;
const originalUser = process.env.SMTP_USER;
const originalPassword = process.env.SMTP_PASSWORD;
let sent;
let fail = false;
nodemailer.createTransport = (options) => {
  assert.equal(options.secure, true);
  assert.equal(options.host, 'smtp.purelymail.com');
  return {
    async sendMail(message) {
      if (fail) throw new Error('SMTP unavailable');
      sent = message;
      return { accepted: [message.to] };
    },
    close() {},
  };
};
const valid = { 'first-name': 'Jane', 'last-name': 'Doe', email: 'jane@example.com', subject: 'Portrait session', message: 'Are you available?', website: '' };
async function request(body = valid, method = 'POST', origin = 'https://example.com') {
  const res = { setHeader() {}, status(code) { this.code = code; return this; }, json(value) { this.body = value; return this; } };
  await handler({ method, body: structuredClone(body), headers: { origin, host: 'example.com', 'content-type': 'application/json' } }, res);
  return res;
}
try {
  process.env.SMTP_USER = 'test@example.com';
  process.env.SMTP_PASSWORD = 'test-only';
  assert.equal((await request(valid, 'GET')).code, 405);
  assert.equal((await request(valid, 'POST', 'https://other.example')).code, 403);
  assert.equal((await request('{broken')).code, 400);
  assert.equal((await request({ ...valid, email: 'bad\r\nBcc: other@example.com' })).code, 400);
  assert.equal((await request({ ...valid, message: 'a'.repeat(5001) })).code, 400);
  assert.equal((await request({ ...valid, website: 'spam' })).code, 200);
  assert.equal(sent, undefined);
  assert.equal((await request()).code, 200);
  assert.equal(sent.to, 'info@lucastaylorphotography.com');
  assert.equal(sent.from.address, sent.to);
  assert.equal(sent.replyTo.address, valid.email);
  assert.ok(sent.text.includes(valid.message));
  delete process.env.SMTP_PASSWORD;
  assert.equal((await request()).code, 503);
  process.env.SMTP_PASSWORD = 'test-only';
  fail = true;
  assert.equal((await request()).code, 502);
  console.log('Contact checks passed: method, origin, validation, honeypot, delivery, reply-to, missing credentials and SMTP failure.');
} finally {
  nodemailer.createTransport = originalTransport;
  if (originalUser === undefined) delete process.env.SMTP_USER;
  else process.env.SMTP_USER = originalUser;
  if (originalPassword === undefined) delete process.env.SMTP_PASSWORD;
  else process.env.SMTP_PASSWORD = originalPassword;
}
