'use server';

/**
 * Contact enquiries are relayed through Brevo's transactional email API (not SMTP), so the
 * credential stays on the server and the form has no public endpoint of its own to abuse.
 */
import { autoReplyEmail, notificationEmail } from './email';
import type { EnquiryState } from './enquiry';

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';

const LIMITS = { name: 120, email: 254, message: 5000 };

const field = (data: FormData, key: string) => (data.get(key) ?? '').toString().trim();

/** Deliberately loose — the only real proof an address works is the reply landing. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot: a real person never sees this field, so anything in it is a bot. Report
  // success so it does not retry with a different shape.
  if (field(formData, 'kv_hp')) {
    console.warn('[contact] Rejected: honeypot filled. Nothing was sent.');
    return { status: 'ok', message: 'Thanks — we will come back to you shortly.' };
  }

  const name = field(formData, 'name');
  const email = field(formData, 'email');
  const message = field(formData, 'message');

  // The `required` attributes on the inputs are client-side only, so everything is
  // re-checked here.
  if (!name || !email || !message) {
    console.warn('[contact] Rejected: a required field was empty.');
    return { status: 'error', message: 'Please fill in your name, email and message.' };
  }
  if (!looksLikeEmail(email)) {
    console.warn('[contact] Rejected: email failed the format check.');
    return { status: 'error', message: 'That email address does not look right.' };
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    console.warn('[contact] Rejected: a field exceeded its length limit.');
    return { status: 'error', message: 'That message is longer than we can accept.' };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error('[contact] Missing BREVO_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.');
    return { status: 'error', message: 'The form is not available right now. Please email us directly.' };
  }

  const send = async (payload: Record<string, unknown>) => {
    const res = await fetch(BREVO_ENDPOINT, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({ sender: { name: 'Kaevor AI Solutions', email: from }, ...payload }),
      cache: 'no-store',
    });

    if (!res.ok) {
      // Brevo's error body can name the sender and account — log it, never return it.
      throw new Error(`Brevo ${res.status}: ${await res.text()}`);
    }

    const { messageId } = (await res.json()) as { messageId?: string };
    return messageId ?? '(no messageId returned)';
  };

  // The notification is the one that matters — if it fails, the enquiry is lost and the
  // visitor needs to know.
  const notification = notificationEmail({ name, email, message });
  try {
    const id = await send({
      to: [{ email: to }],
      // Replying in the inbox answers the enquirer rather than ourselves.
      replyTo: { email, name },
      subject: notification.subject,
      textContent: notification.text,
      htmlContent: notification.html,
    });
    console.log('[contact] Enquiry delivered:', id);
  } catch (err) {
    console.error('[contact] Failed to deliver the enquiry:', err);
    return { status: 'error', message: 'We could not send that just now. Please try again shortly.' };
  }

  // The acknowledgement is a courtesy. We already have the enquiry, so a failure here is
  // logged and swallowed rather than told to the visitor.
  const reply = autoReplyEmail({ name, message });
  try {
    const id = await send({
      to: [{ email, name }],
      // The From is an unattended address, so this is what makes "just hit reply" true.
      replyTo: { email: to, name: 'Kaevor AI Solutions' },
      subject: reply.subject,
      textContent: reply.text,
      htmlContent: reply.html,
    });
    console.log('[contact] Auto-reply sent:', id);
  } catch (err) {
    console.warn('[contact] Auto-reply failed (enquiry was still delivered):', err);
  }

  return { status: 'ok', message: 'Thanks — we will come back to you shortly.' };
}
