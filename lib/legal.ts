/**
 * Legal copy as data, in the same shape as PROCESS / SERVICES in ./content.ts.
 *
 * Clause `id`s are permanent anchors — they end up in URLs people cite, so rewording a
 * heading is fine but changing an id breaks links that already exist.
 *
 * Body strings support one inline form: [label](href). Anything else is plain text.
 */

/** Flips the "draft, pending legal review" banner on both pages. Set false once reviewed. */
export const LEGAL_DRAFT = true;

export const COMPANY = {
  name: 'Kaevor AI Solutions',
  domain: 'kaevor-ai.tech',
  site: 'https://kaevor-ai.tech',
  legalEmail: 'info@kaevor-ai.tech',
  privacyEmail: 'support@kaevor-ai.tech',
  country: 'Sri Lanka',
  courts: 'Colombo, Sri Lanka',
  retention: '6 months',
  updated: '17 August 2026',
} as const;

export type Clause = {
  /** Permanent anchor id. */
  id: string;
  no: string;
  heading: string;
  body: string[];
  list?: string[];
};

export type LegalDocument = {
  slug: 'terms' | 'privacy';
  title: string;
  standfirst: string;
  meta: { label: string; value: string }[];
  clauses: Clause[];
};

const META = [
  { label: 'Last updated', value: COMPANY.updated },
  { label: 'Applies to', value: COMPANY.domain },
  { label: 'Governing law', value: COMPANY.country },
];

export const TERMS: LegalDocument = {
  slug: 'terms',
  title: 'Terms & Conditions',
  standfirst:
    'The terms on which you may use this website. Plain English, kept as short as the subject allows.',
  meta: [...META, { label: 'Contact', value: COMPANY.legalEmail }],
  clauses: [
    {
      id: 'who-we-are',
      no: '01',
      heading: 'Who we are',
      body: [
        `${COMPANY.name} ("Kaevor", "we", "us") is a founder-led software and applied AI studio based in ${COMPANY.country}, working remotely with clients in Sri Lanka and abroad.`,
        `This website is published at ${COMPANY.domain}. You can reach us about anything on this page at [${COMPANY.legalEmail}](mailto:${COMPANY.legalEmail}).`,
      ],
    },
    {
      id: 'acceptance',
      no: '02',
      heading: 'Acceptance of these terms',
      body: [
        'By accessing or using this website you agree to these terms. If you do not agree with them, please do not use the site.',
        'These terms apply to the website only. They do not replace any agreement we sign with you as a client — see clause 12.',
      ],
    },
    {
      id: 'what-this-site-is',
      no: '03',
      heading: 'What this site is',
      body: [
        'This site is informational. It describes the work we do, the way we work and the people who do it.',
        'Nothing on this site is an offer, a quotation, a commitment to take on work, or a promise of a particular result. Case studies and outcomes describe past work in its own context and are not a forecast of what your project will achieve.',
        'No engagement, retainer or contract is formed by using this site or by sending us an enquiry through it.',
      ],
    },
    {
      id: 'intellectual-property',
      no: '04',
      heading: 'Intellectual property',
      body: [
        'Unless stated otherwise, everything on this site — text, layout, design, code, imagery, case-study material and the Kaevor name, wordmark and ring logo — belongs to us or is used with permission.',
        'You may read the site, share links to it, and quote short extracts with attribution. Everything beyond that needs our written permission first.',
        'Client names, marks and product screenshots that appear here remain the property of their owners.',
      ],
    },
    {
      id: 'permitted-use',
      no: '05',
      heading: 'Permitted use of this site',
      body: ['You agree not to:'],
      list: [
        'copy, scrape, crawl or harvest the site or its content by automated means, including for training or evaluating machine-learning models, without our written permission',
        'republish, resell or present our content or case studies as your own work',
        'attempt to gain unauthorised access to the site, its hosting, or any connected system',
        'interfere with the availability of the site, or introduce malicious code to it',
        'use the contact form to send unsolicited marketing, bulk messages or anything unlawful',
      ],
    },
    {
      id: 'third-party-links',
      no: '06',
      heading: 'Third-party links and references',
      body: [
        'This site links to third-party sites and profiles. We do not control them, we are not responsible for their content or their handling of your data, and a link is not an endorsement.',
        'Once you follow a link away from this site, that site’s own terms and privacy policy apply.',
      ],
    },
    {
      id: 'enquiries',
      no: '07',
      heading: 'Enquiries and submissions',
      body: [
        'When you send an enquiry through the contact form, you confirm that the details you give are accurate and that you are entitled to share them with us.',
        'Please do not send confidential information, personal data about other people, trade secrets, credentials or anything covered by a non-disclosure agreement through this form. It is an ordinary email channel, not a secure one, and nothing sent through it is treated as confidential until we have a signed agreement in place.',
        'If your enquiry needs to include sensitive material, contact us first and we will arrange a suitable route.',
        'We may keep a record of your enquiry to respond to it and to keep track of our own correspondence — see the [Privacy Policy](/privacy).',
      ],
    },
    {
      id: 'no-advice',
      no: '08',
      heading: 'No professional advice, no accuracy warranty',
      body: [
        'The content on this site is general information about our practice. It is not technical, legal, financial or professional advice, and you should not act on it without advice suited to your own situation.',
        'We take care to keep the site accurate and current, but we do not warrant that it is complete, error-free or up to date, and we may change any of it without notice.',
      ],
    },
    {
      id: 'availability',
      no: '09',
      heading: 'Availability of the site',
      body: [
        'We aim to keep the site available, but we do not guarantee uninterrupted access. We may suspend, withdraw or change all or part of it — including the contact form — without notice, and we will not be liable to you if it is unavailable at any time.',
      ],
    },
    {
      id: 'liability',
      no: '10',
      heading: 'Limitation of liability',
      body: [
        'To the fullest extent permitted by law, we are not liable for any loss of profit, loss of business, loss of data, or any indirect or consequential loss arising from your use of, or inability to use, this website or anything you rely on from it.',
        'Nothing in these terms limits or excludes liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for anything else that cannot lawfully be limited.',
        'Our liability under a signed client agreement is governed by that agreement, not by this clause.',
      ],
    },
    {
      id: 'indemnity',
      no: '11',
      heading: 'Indemnity',
      body: [
        'You agree to cover us for any claim, loss or reasonable cost we incur as a result of your breach of these terms or your misuse of this site.',
      ],
    },
    {
      id: 'engagements',
      no: '12',
      heading: 'Client engagements are governed separately',
      body: [
        'Paid work is governed by a separate written agreement — a master services agreement, statement of work, proposal or order form signed by both sides.',
        'Where that agreement conflicts with these website terms, that agreement prevails for everything to do with the engagement: scope, fees, intellectual property in deliverables, confidentiality, data protection, warranties and liability.',
      ],
    },
    {
      id: 'privacy',
      no: '13',
      heading: 'Privacy',
      body: [
        `How we handle personal information is set out in our [Privacy Policy](/privacy), which forms part of these terms.`,
      ],
    },
    {
      id: 'changes',
      no: '14',
      heading: 'Changes to these terms',
      body: [
        `We may update these terms from time to time. The version published here is the one that applies, and the date at the top of this page tells you when it last changed. This version is dated ${COMPANY.updated}.`,
        'Continuing to use the site after a change means you accept the updated terms.',
      ],
    },
    {
      id: 'governing-law',
      no: '15',
      heading: 'Governing law and jurisdiction',
      body: [
        `These terms are governed by the laws of ${COMPANY.country}. Any dispute arising from them or from your use of this site falls to the courts of ${COMPANY.courts}.`,
      ],
    },
    {
      id: 'contact',
      no: '16',
      heading: 'Contact',
      body: [
        `Questions about these terms: [${COMPANY.legalEmail}](mailto:${COMPANY.legalEmail}).`,
        `${COMPANY.name}, ${COMPANY.country}.`,
      ],
    },
  ],
};

export const PRIVACY: LegalDocument = {
  slug: 'privacy',
  title: 'Privacy Policy',
  standfirst:
    'What we collect when you contact us, why we hold it, how long we keep it, and what you can ask us to do about it.',
  meta: [...META, { label: 'Contact', value: COMPANY.privacyEmail }],
  clauses: [
    {
      id: 'controller',
      no: '01',
      heading: 'Who controls your information',
      body: [
        `${COMPANY.name}, based in ${COMPANY.country}, decides how and why personal information collected through ${COMPANY.domain} is used. In data protection terms we are the controller for that information.`,
        `We do not publish a postal address. For anything in this policy, including a request about your own data, write to [${COMPANY.privacyEmail}](mailto:${COMPANY.privacyEmail}) and we will respond from a named person.`,
      ],
    },
    {
      id: 'what-we-collect',
      no: '02',
      heading: 'What we collect',
      body: ['Two things, and no more than that:'],
      list: [
        'What you type into the contact form — your name, your email address and your message. Nothing is pre-filled and nothing is collected before you press send.',
        'Standard technical records created by our hosting provider when any website is visited: IP address, browser type, the page requested and the time. These are ordinary server logs, not a profile of you.',
      ],
    },
    {
      id: 'why',
      no: '03',
      heading: 'Why we use it, and our lawful basis',
      body: [
        'We use what you send us to read your enquiry, reply to it, and keep a record of the conversation. That is all we use it for.',
        'We do not sell it, rent it, trade it, or add you to a mailing list. We do not use it for advertising, and we do not use enquiry content to train machine-learning models.',
        'Where the GDPR applies to you, our lawful basis is legitimate interests — you have approached us about our services, and responding to that is what you would expect. Where Sri Lanka’s Personal Data Protection Act No. 9 of 2022 applies, we process on the equivalent basis of responding to a request you initiated. You can object at any time and we will stop.',
      ],
    },
    {
      id: 'sharing',
      no: '04',
      heading: 'Who else sees it',
      body: [
        'Only the founders of Kaevor, and two service providers who process data on our instructions and are not permitted to use it for their own purposes:',
      ],
      list: [
        'Brevo (Sendinblue SAS, France) — delivers your enquiry to our inbox and sends you the acknowledgement email confirming we received it. Your name, email address and message pass through their transactional email service.',
        'Our website hosting provider — serves the site and generates the server logs described above.',
      ],
    },
    {
      id: 'transfers',
      no: '05',
      heading: 'Where your information is processed',
      body: [
        'We are based in Sri Lanka, so your information is accessed from there. Brevo is a French company and processes email within the European Union.',
        'Where information moves between these places, we rely on our providers’ contractual data protection terms, which include the European Commission’s standard contractual clauses where they are required.',
      ],
    },
    {
      id: 'retention',
      no: '06',
      heading: 'How long we keep it',
      body: [
        `Enquiries are kept for ${COMPANY.retention} from your last message to us, then deleted. If your enquiry becomes a client engagement, the correspondence is kept for as long as that relationship and our record-keeping obligations require, under the agreement we sign with you.`,
        'Server logs are kept for the short period our hosting provider retains them by default.',
        'You can ask us to delete your enquiry sooner — see clause 7.',
      ],
    },
    {
      id: 'your-rights',
      no: '07',
      heading: 'Your rights',
      body: [
        `Write to [${COMPANY.privacyEmail}](mailto:${COMPANY.privacyEmail}) and you can ask us to:`,
      ],
      list: [
        'tell you what we hold about you, and give you a copy of it',
        'correct anything inaccurate or incomplete',
        'delete it',
        'stop or restrict what we are doing with it, including objecting to it entirely',
        'send it to you, or to someone else, in a portable format',
      ],
    },
    {
      id: 'rights-handling',
      no: '08',
      heading: 'How we handle those requests',
      body: [
        'We do not charge for this, and we will respond within 30 days. If we need to confirm who you are before releasing anything, we will ask — usually by replying to the address the enquiry came from.',
        'These rights come from Sri Lanka’s Personal Data Protection Act No. 9 of 2022 and, where it applies to you, the GDPR. We honour requests from anyone who asks, wherever you are, rather than checking which law covers you first.',
      ],
    },
    {
      id: 'security',
      no: '09',
      heading: 'Security',
      body: [
        'The site is served over HTTPS. Form submissions are handled on the server, so the credentials used to send the email are never exposed to your browser. Access to the inbox that receives enquiries is limited to the founders.',
        'No system is perfectly secure, and email in particular is not a confidential channel. Please do not send us credentials, financial details, or confidential material through the form — see clause 7 of the [Terms](/terms#enquiries).',
      ],
    },
    {
      id: 'cookies',
      no: '10',
      heading: 'Cookies and analytics',
      body: [
        'This site sets no cookies. There is no analytics, no advertising pixel and no third-party tracker on any page.',
        'Fonts are built into the site rather than fetched from a font provider while you browse, so visiting this site does not make a request to any third party about you. This is why you are not being shown a cookie banner — there is nothing to consent to.',
        'If we ever add analytics, we will update this policy before turning it on.',
      ],
    },
    {
      id: 'children',
      no: '11',
      heading: 'Children',
      body: [
        'This site is aimed at organisations and the people who work in them. It is not directed at children, and we do not knowingly collect information from anyone under 16. If you believe a child has sent us something, tell us and we will delete it.',
      ],
    },
    {
      id: 'changes',
      no: '12',
      heading: 'Changes to this policy',
      body: [
        `We may update this policy. The version here is the one that applies, and the date at the top tells you when it last changed. This version is dated ${COMPANY.updated}.`,
      ],
    },
    {
      id: 'complaints',
      no: '13',
      heading: 'Complaints',
      body: [
        `If you are unhappy with how we have handled your information, tell us first at [${COMPANY.privacyEmail}](mailto:${COMPANY.privacyEmail}) — most things are quicker to fix directly.`,
        'You also have the right to complain to a regulator: in Sri Lanka, the Data Protection Authority established under the Personal Data Protection Act No. 9 of 2022; in the EU or UK, your national supervisory authority.',
      ],
    },
  ],
};

export const LEGAL_DOCS = { terms: TERMS, privacy: PRIVACY } as const;
