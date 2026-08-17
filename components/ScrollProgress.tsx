'use client';

import { useEffect, useRef } from 'react';
import { clamp, onScrollFrame } from '@/lib/scrollDriver';

/** Thin 2px accent bar pinned to the top of the viewport. DESIGN.md §5. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onScrollFrame(() => {
        const bar = ref.current;
        if (!bar) return;
        const h = window.innerHeight;
        const sy = window.scrollY || document.documentElement.scrollTop || 0;
        const doc = Math.max(1, document.documentElement.scrollHeight - h);
        bar.style.width = `${(clamp(sy / doc) * 100).toFixed(2)}%`;
      }),
    [],
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 2,
        width: '0%',
        background: 'var(--accent)',
        zIndex: 300,
      }}
    />
  );
}
