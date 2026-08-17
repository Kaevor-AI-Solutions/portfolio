'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { useMagnetic } from '@/lib/hooks';
import s from './Contact.module.css';

export default function Contact() {
  const submitRef = useMagnetic<HTMLButtonElement>();
  const [sent, setSent] = useState(false);

  // No submission endpoint is specified by the design — wire this to your handler.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

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

        <Reveal as="form" index={1} className={s.form} onSubmit={onSubmit}>
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

          <button ref={submitRef} type="submit" className={`cta ${s.submit}`}>
            Send it over →
          </button>

          {sent && (
            <span className={s.status} role="status">
              Thanks — we&apos;ll come back to you shortly.
            </span>
          )}
        </Reveal>
      </div>
    </section>
  );
}
