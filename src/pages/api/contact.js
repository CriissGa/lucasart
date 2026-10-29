import handler from '../../lib/contact-handler.js';

// Keep the existing SMTP validation and delivery logic when Astro runs on Vercel.
export async function ALL({request}) {
  const headers = Object.fromEntries(request.headers);
  headers.host = new URL(request.url).host;
  const responseHeaders = new Headers();
  const response = {
    code: 200,
    setHeader(name, value) { responseHeaders.set(name, value); },
    status(code) { this.code = code; return this; },
    json(value) {
      responseHeaders.set('Content-Type', 'application/json');
      return new Response(JSON.stringify(value), {status: this.code, headers: responseHeaders});
    },
  };
  return handler({method: request.method, headers, body: request.method === 'POST' ? await request.text() : undefined}, response);
}
