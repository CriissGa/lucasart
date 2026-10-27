# Contact email on Vercel

The static Astro contact page posts JSON to `api/contact.js`, a Vercel Node
function. It sends through Purelymail SMTP over TLS (port 465). No SMTP secrets
are included in the browser. Messages go to info@lucastaylorphotography.com;
Reply in your mail client addresses the visitor.

## Activation

1. In Purelymail, confirm the mailbox/alias info@lucastaylorphotography.com
   receives email and the domain's DNS verification passes. The SMTP account
   must be authorized to send from that address.
2. In Vercel → Project → Settings → Environment Variables, add `SMTP_USER`
   (the full Purelymail login email) and `SMTP_PASSWORD` (the mailbox password,
   or an app password if two-factor authentication is enabled). Apply to
   Production and, if needed, Preview. Never use a PUBLIC_ prefix or commit
   real credentials.
3. Deploy this change and redeploy after setting/changing the variables.
4. Submit a real message from the deployed /contact page. Confirm receipt in
   Purelymail (including Spam) and check that Reply targets the visitor.

`npm run build` checks the static site; it does not run the Vercel function.
Use a Vercel preview deployment or `vercel dev` to test the complete flow.
The Astro development server alone does not serve the root api/ directory.

The endpoint validates input, limits field lengths, checks browser origin and
includes a honeypot. These are basic spam defenses; configure a rate-limit rule
for POST /api/contact in Vercel Firewall if abuse occurs. Origin checks do not
authenticate callers or prevent automated requests.

The success response means the SMTP server accepted the message, not that inbox
delivery has been independently confirmed. No live delivery test is possible
without configured credentials and a deployment.

References:
- https://purelymail.com/docs/setup/technical
- https://vercel.com/docs/functions/runtimes/node-js
