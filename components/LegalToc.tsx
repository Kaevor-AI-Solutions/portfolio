'use client';

import { useEffect, useState } from 'react';
import type { Clause } from '@/lib/legal';
import { onScrollFrame } from '@/lib/scrollDriver';
import s from './LegalDoc.module.css';

type Entry = Pick<Clause, 'id' | 'no' | 'heading'>;

/**
 * Contents rail. Rendered twice — a sticky column at 1024px+ and a collapsed disclosure
 * below that — with the media queries hiding one outright, so only one reaches the
 * accessibility tree at a time.
 */
export default function LegalToc({ clauses }: { clauses: Entry[] }) {
  const [active, setActive] = useState(clauses[0]?.id ?? '');

  // Rides the shared scroll driver rather than adding a listener of its own.
  useEffect(
    () =>
      onScrollFrame(() => {
        // A clause counts as current once its heading clears the fixed nav.
        const line = 140;
        let current = clauses[0]?.id ?? '';
        for (const c of clauses) {
          const el = document.getElementById(c.id);
          if (el && el.getBoundingClientRect().top <= line) current = c.id;
        }
        setActive((prev) => (prev === current ? prev : current));
      }),
    [clauses],
  );

  const links = clauses.map((c) => (
    <a
      key={c.id}
      href={`#${c.id}`}
      className={s.tocLink}
      data-active={String(c.id === active)}
      aria-current={c.id === active ? 'true' : undefined}
    >
      <span className={s.tocNo}>{c.no}</span>
      <span>{c.heading}</span>
    </a>
  ));

  return (
    <>
      <nav className={s.toc} aria-label="Contents">
        <span className="monoLabel">Contents</span>
        <div className={s.tocLinks}>{links}</div>
      </nav>

      <details className={s.tocMobile}>
        <summary className={s.tocSummary}>Contents</summary>
        <div className={s.tocLinks}>{links}</div>
      </details>
    </>
  );
}
