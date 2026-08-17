'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from './scrollDriver';

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Section entrance: 26px rise + fade, 800ms on the ease-out-expo-ish curve, staggered
 * by 70ms in groups of four. Elements start hidden from CSS (`[data-reveal]`) so there
 * is no flash before hydration.
 */
export function useReveal<T extends HTMLElement>(index = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const delay = (index % 4) * 70;
    el.style.transition =
      `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}ms,` +
      `transform .8s cubic-bezier(.22,1,.36,1) ${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [index]);

  return ref;
}

/** Magnetic pull, reserved for primary CTAs only so it reads as a signal, not decoration. */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const move = (ev: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = ev.clientX - (r.left + r.width / 2);
      const dy = ev.clientY - (r.top + r.height / 2);
      el.style.transition = 'transform .18s ease-out';
      el.style.transform = `translate(${(dx * 0.22).toFixed(1)}px,${(dy * 0.3).toFixed(1)}px)`;
    };
    const out = () => {
      el.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
      el.style.transform = 'translate(0,0)';
    };

    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', out);
    return () => {
      el.removeEventListener('mousemove', move);
      el.removeEventListener('mouseleave', out);
    };
  }, []);

  return ref;
}

export function useMediaQuery(query: string, fallback: boolean) {
  const [matches, setMatches] = useState(fallback);

  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);

  return matches;
}
