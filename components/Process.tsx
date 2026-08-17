'use client';

import { useEffect, useRef } from 'react';
import Reveal from './Reveal';
import { PROCESS } from '@/lib/content';
import { clamp, onScrollFrame } from '@/lib/scrollDriver';
import s from './Process.module.css';

export default function Process() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onScrollFrame(() => {
        const proc = stepsRef.current;
        if (!proc) return;

        const h = window.innerHeight;
        const r = proc.getBoundingClientRect();
        const pr = clamp((h * 0.72 - r.top) / Math.max(1, r.height * 0.8));

        if (fillRef.current) fillRef.current.style.transform = `scaleY(${pr.toFixed(3)})`;

        const nodes = Array.from(proc.querySelectorAll<HTMLElement>('[data-procnode]'));
        nodes.forEach((n, i) => {
          const on = pr > (i + 0.1) / nodes.length;
          n.style.background = on ? '#3ED0C4' : '#22262B';
          n.style.boxShadow = on ? '0 0 0 5px rgba(62,208,196,.12)' : 'none';
        });
      }),
    [],
  );

  return (
    <section id="process" className={s.section}>
      <div className="container">
        <Reveal className={`sectionHead ${s.head}`}>
          <span className="eyebrow">How we work</span>
          <h2 className="sectionTitle">Four phases. No AI theatre.</h2>
        </Reveal>

        <div ref={stepsRef} className={s.steps}>
          <div className={s.line}>
            <div ref={fillRef} className={s.lineFill} />
          </div>

          {PROCESS.map((step, i) => (
            <Reveal key={step.no} index={i} className={s.step}>
              <div className={s.marker}>
                <span data-procnode="" className={s.node} />
                <span className={s.stepNo}>{step.no}</span>
              </div>
              <div className={s.body}>
                <h3 className={s.stepTitle}>{step.title}</h3>
                <p className={s.stepText}>{step.body}</p>
              </div>
              <div className={s.outputs}>
                {step.outputs.map((o) => (
                  <span key={o}>→ {o}</span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
