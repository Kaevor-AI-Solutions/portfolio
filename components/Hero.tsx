'use client';

import { useEffect, useRef } from 'react';
import { clamp, onScrollFrame, prefersReducedMotion } from '@/lib/scrollDriver';
import { useMagnetic } from '@/lib/hooks';
import s from './Hero.module.css';

type Particle = {
  tx: number;
  ty: number;
  ox: number;
  oy: number;
  ax: number;
  ay: number;
  sp: number;
  ph: number;
  warm: boolean;
};

/**
 * The signature motion moment: a particle field that starts scattered and settles
 * into concentric elliptical rings as the hero scrolls away — "order from chaos",
 * the one echo of the water/flow motif. Everything else on the page stays restrained
 * so this lands. DESIGN.md §1 / §5.
 */
export default function Hero() {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>();

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let W = 0;
    let H = 0;
    let parts: Particle[] = [];
    let rings: number[] = [];
    let progress = 0;
    let raf = 0;

    const build = () => {
      const r = canvas.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // A third of the density on phones — DESIGN.md mobile note.
      const density = window.innerWidth < 768 ? 0.42 : 1;
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.min(W, H) * 0.52;
      const step = Math.max(16, (maxR * 0.082) / density);

      parts = [];
      rings = [];
      for (let rr = maxR * 0.14; rr <= maxR; rr += step) {
        rings.push(rr);
        const n = Math.max(8, Math.round((2 * Math.PI * rr) / (19 / density)));
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + rr * 0.0055;
          parts.push({
            tx: cx + Math.cos(a) * rr,
            ty: cy + Math.sin(a) * rr * 0.6,
            ox: cx + rand(-0.62, 0.62) * W,
            oy: cy + rand(-0.72, 0.72) * H,
            ax: rand(8, 46),
            ay: rand(8, 40),
            sp: rand(0.12, 0.42),
            ph: rand(0, 6.28),
            warm: Math.random() < 0.055,
          });
        }
      }
    };

    const draw = (t: number) => {
      if (!W || !H || !canvas.isConnected) return;
      const raw = clamp(progress);
      // easeInOutCubic — slow start, decisive settle.
      const p = raw < 0.5 ? 4 * raw * raw * raw : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;

      if (p > 0.3) {
        const a = ((p - 0.3) / 0.7) * 0.13;
        ctx.strokeStyle = `rgba(62,208,196,${a.toFixed(3)})`;
        ctx.lineWidth = 1;
        rings.forEach((rr, i) => {
          if (i % 2) return;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rr, rr * 0.6, 0, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      for (let i = 0; i < parts.length; i++) {
        const q = parts[i];
        const dx = q.ox + Math.sin(t * q.sp + q.ph) * q.ax;
        const dy = q.oy + Math.cos(t * q.sp * 0.83 + q.ph) * q.ay;
        const jx = Math.sin(t * 0.5 + q.ph) * (1 - p) * 2;
        const x = dx + (q.tx - dx) * p + jx;
        const y = dy + (q.ty - dy) * p;
        const size = 1.1 + (1 - p) * 0.9;
        const alpha = (0.16 + p * 0.52) * (1 - raw * 0.35);
        ctx.fillStyle = q.warm
          ? `rgba(232,184,92,${(alpha * 0.9).toFixed(3)})`
          : `rgba(62,208,196,${alpha.toFixed(3)})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    };

    build();

    const loop = () => {
      draw(reduced ? 0 : performance.now() / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const unsubscribe = onScrollFrame(() => {
      const hostH = Math.max(1, host.offsetHeight * 0.82);
      progress = clamp(-host.getBoundingClientRect().top / hostH);

      const hc = contentRef.current;
      if (hc && !reduced) {
        hc.style.transform = `translateY(${(progress * 72).toFixed(1)}px)`;
        hc.style.opacity = String(Math.max(0, 1 - progress * 1.55));
      }
    });

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      unsubscribe();
    };
  }, []);

  return (
    <section ref={hostRef} className={s.hero}>
      <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
      <div className={s.veil} />

      <div ref={contentRef} className={s.content}>
        <div className={s.status}>
          <span className={s.dot} />
          <span>AI product engineering · Sri Lanka</span>
        </div>

        <h1 className={s.title}>AI systems that move real work.</h1>

        <p className={s.sub}>
          Kaevor AI Solutions designs and ships applied AI, SaaS and cross-platform products for
          teams that need more than a polished prototype.
        </p>

        <div className={s.actions}>
          <a ref={ctaRef} href="#contact" className="cta">
            Start a project
            <span style={{ fontSize: 15 }}>→</span>
          </a>
          <a href="#work" className="ghostLink">
            See the work
          </a>
        </div>
      </div>

      <div className={s.cornerLeft}>Founder-led — Sri Lanka</div>
      <div className={s.cornerRight}>
        <span>AI · Product · Platform</span>
        <span className={s.arrow}>↓</span>
      </div>
    </section>
  );
}
