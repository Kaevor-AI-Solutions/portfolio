import { COMPANY } from './legal';

/**
 * Branded HTML email templates.
 *
 * Email is not the web. Everything here is table-based with inline styles, because
 * Outlook renders with Word's engine — no flexbox, no grid, no stylesheet, no CSS
 * variables. Width is capped at 600px, the safe ceiling across desktop clients.
 *
 * The palette is dark to match the site, and because the logo artwork is light-on-
 * transparent: on a white email body it would be invisible.
 */

const INK = {
  bg: '#0a0b0d',
  panel: '#121417',
  border: '#22262b',
  text: '#f2f3f5',
  muted: '#8a8f98',
  /* The logo's own teal, not the site token (#3ed0c4) — inside an email the artwork is
     the dominant brand element, so accents match it exactly. */
  accent: '#00d2d4',
  warm: '#e8b85c',
};

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace";

/** Absolute URL — email clients cannot resolve relative paths. */
const SITE = process.env.SITE_URL || COMPANY.site;
const LOGO = `${SITE}/assets/application/dark-theme-logo-lockup.png`;

export const escapeHtml = (v: string) =>
  v.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );

const paragraphs = (v: string) =>
  escapeHtml(v)
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, '<br>'))
    .join('<br><br>');

const label = (text: string, color = INK.muted) =>
  `<p style="margin:0 0 10px;font-family:${MONO};font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:${color}">${text}</p>`;

const heading = (text: string) =>
  `<h1 style="margin:0 0 16px;font-family:${SANS};font-weight:600;font-size:26px;line-height:1.25;letter-spacing:-.01em;color:${INK.text}">${text}</h1>`;

const body = (html: string) =>
  `<p style="margin:0 0 16px;font-family:${SANS};font-size:15px;line-height:1.65;color:${INK.muted}">${html}</p>`;

/** Quoted block — used for the enquirer's own words in both templates. */
const quote = (title: string, html: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
         style="margin:24px 0;border-left:2px solid ${INK.accent};background:${INK.bg}">
    <tr><td style="padding:18px 20px">
      ${label(title)}
      <div style="font-family:${SANS};font-size:15px;line-height:1.7;color:${INK.text}">${html}</div>
    </td></tr>
  </table>`;

const button = (href: string, text: string) => `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 4px">
    <tr><td style="background:${INK.accent};border-radius:2px">
      <a href="${href}" style="display:inline-block;padding:14px 26px;font-family:${MONO};font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${INK.bg};text-decoration:none">${text}</a>
    </td></tr>
  </table>`;

/**
 * Outer shell: dark header carrying the logo, a panel for content, and a legal footer.
 *
 * The logo's `alt` is styled to look like the wordmark, because most clients block
 * images by default — when it does not load, the brand name still reads correctly
 * rather than showing a broken-image icon.
 */
function shell(preheader: string, content: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(COMPANY.name)}</title>
</head>
<body style="margin:0;padding:0;background:${INK.bg};-webkit-font-smoothing:antialiased">

<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(preheader)}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${INK.bg}">
  <tr><td align="center" style="padding:32px 16px">

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px">

      <tr><td style="padding:8px 0 28px">
        <a href="${SITE}" style="text-decoration:none">
          <img src="${LOGO}" width="150" height="29" alt="KAEVOR AI"
               style="display:block;border:0;width:150px;height:auto;font-family:${SANS};font-size:16px;font-weight:700;letter-spacing:.14em;color:${INK.text};text-decoration:none">
        </a>
      </td></tr>

      <tr><td style="background:${INK.panel};border:1px solid ${INK.border};border-radius:3px;padding:36px 32px">
        ${content}
      </td></tr>

      <tr><td style="padding:24px 4px 8px">
        <p style="margin:0 0 8px;font-family:${MONO};font-size:11px;letter-spacing:.08em;color:${INK.muted}">
          ${escapeHtml(COMPANY.name)} &middot; ${escapeHtml(COMPANY.country)} &middot; Founder-led
        </p>
        <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${INK.muted}">
          <a href="${SITE}" style="color:${INK.muted};text-decoration:underline">${escapeHtml(COMPANY.domain)}</a>
          &nbsp;&middot;&nbsp;
          <a href="${SITE}/terms" style="color:${INK.muted};text-decoration:underline">Terms</a>
          &nbsp;&middot;&nbsp;
          <a href="${SITE}/privacy" style="color:${INK.muted};text-decoration:underline">Privacy</a>
        </p>
      </td></tr>

    </table>

  </td></tr>
</table>
</body>
</html>`;
}

export type Enquiry = { name: string; email: string; message: string };

/** Sent to the studio inbox. Optimised for triage, not for looks. */
export function notificationEmail({ name, email, message }: Enquiry) {
  const content = `
    ${label('New enquiry', INK.accent)}
    ${heading(escapeHtml(name))}
    ${body(`<a href="mailto:${escapeHtml(email)}" style="color:${INK.accent};text-decoration:none">${escapeHtml(email)}</a>`)}
    ${quote('Message', paragraphs(message))}
    ${button(`mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent('Re: your enquiry to Kaevor AI Solutions')}`, 'Reply →')}
    <p style="margin:18px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${INK.muted}">
      Replying to this email reaches ${escapeHtml(name)} directly — the reply-to is already set.
    </p>`;

  return {
    subject: `New enquiry — ${name}`,
    html: shell(`${name} <${email}> — ${message.slice(0, 90)}`, content),
    text: `New enquiry\n\nFrom: ${name} <${email}>\n\n${message}\n\n— Sent from ${COMPANY.domain}`,
  };
}

/** Sent back to whoever filled in the form. */
export function autoReplyEmail({ name, message }: Omit<Enquiry, 'email'>) {
  const first = name.split(/\s+/)[0] || name;

  const content = `
    ${label('Received', INK.accent)}
    ${heading(`Thanks, ${escapeHtml(first)} — we have your message.`)}
    ${body('A founder reads every enquiry that comes through the site, so this is not going into a queue somewhere. Expect a reply within two working days.')}
    ${body('If it turns out we are not the right people for what you are building, we will tell you that plainly and point you somewhere better.')}
    ${quote('What you sent us', paragraphs(message))}
    ${body(`In the meantime, our recent work is at <a href="${SITE}/#work" style="color:${INK.accent};text-decoration:none">${escapeHtml(COMPANY.domain)}</a>.`)}
    ${button(`${SITE}/#work`, 'See the work →')}
    <p style="margin:22px 0 0;padding-top:18px;border-top:1px solid ${INK.border};font-family:${SANS};font-size:12px;line-height:1.6;color:${INK.muted}">
      This is an automatic acknowledgement, but replies reach us — just hit reply.
      Please keep confidential material out of email until we have an agreement in place.
    </p>`;

  return {
    subject: `We have your message — ${COMPANY.name}`,
    html: shell('A founder will reply within two working days.', content),
    text:
      `Thanks, ${first} — we have your message.\n\n` +
      `A founder reads every enquiry that comes through the site. Expect a reply within two working days.\n\n` +
      `What you sent us:\n${message}\n\n` +
      `This is an automatic acknowledgement, but replies reach us — just hit reply.\n\n` +
      `${COMPANY.name} · ${COMPANY.country} · ${COMPANY.domain}`,
  };
}
