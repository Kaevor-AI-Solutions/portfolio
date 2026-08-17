'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import Reveal from './Reveal';
import { sendEnquiry } from '@/lib/actions';
import { INITIAL_ENQUIRY_STATE } from '@/lib/enquiry';
import { useMagnetic } from '@/lib/hooks';
import s from './Contact.module.css';

export default function Contact() {
  const submitRef = useMagnetic<HTMLButtonElement>();
  const [state, formAction, pending] = useActionState(sendEnquiry, INITIAL_ENQUIRY_STATE);

  return (
    <section id="contact" className={s.section}>
      <div className={s.inner}>
        <Reveal className={s.left}>
          <span className="eyebrow">Contact</span>
          <h2 className={s.title}>Tell us what should work better.</h2>
          <p className={s.text}>
            Bring the messy workflow, product idea or system your team has outgrown. We will help
            make the next decision concrete.
          </p>
          <div className={s.info}>
            <span className={s.infoStrong}>Kaevor AI Solutions</span>
            <span>Sri Lanka · Remote collaboration</span>
            <span>AI systems · Product platforms · Quality engineering</span>
            <span className={s.infoWarm}>Founder-led technical delivery</span>
          </div>
        </Reveal>

        <Reveal as="form" index={1} className={s.form} action={formAction}>
          <label className={s.field}>
            <span className={s.fieldLabel}>Name</span>
            <input className={s.input} type="text" name="name" placeholder="Your name" required />
          </label>

          <label className={s.field}>
            <span className={s.fieldLabel}>Email</span>
            <input
              className={s.input}
              type="email"
              name="email"
              placeholder="you@organisation.lk"
              required
            />
          </label>

          <label className={s.field}>
            <span className={s.fieldLabel}>What are you building?</span>
            <textarea
              className={s.textarea}
              name="message"
              rows={4}
              placeholder="Two or three sentences is plenty."
              required
            />
          </label>

          {/*
            Honeypot — off-screen, skipped by keyboard and screen readers. The name is
            deliberately meaningless: browsers ignore `autocomplete="off"` on fields they
            recognise, so anything like "company" gets autofilled from a saved profile and
            every real submission looks like a bot.
          */}
          <div className={s.trap} aria-hidden="true">
            <label htmlFor="kv-hp">Leave this field empty</label>
            <input id="kv-hp" type="text" name="kv_hp" tabIndex={-1} autoComplete="off" />
          </div>

          <button ref={submitRef} type="submit" className={`cta ${s.submit}`} disabled={pending}>
            {pending ? 'Sending…' : 'Send it over →'}
          </button>

          <p className={s.consent}>
            By sending this you agree to our <Link href="/terms">Terms</Link> and{' '}
            <Link href="/privacy">Privacy Policy</Link>. Please don&apos;t include confidential
            information.
          </p>

          {state.status !== 'idle' && (
            <span
              className={state.status === 'ok' ? s.status : s.statusError}
              role={state.status === 'ok' ? 'status' : 'alert'}
            >
              {state.message}
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
