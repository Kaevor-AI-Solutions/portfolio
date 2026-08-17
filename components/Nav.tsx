'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { onScrollFrame } from '@/lib/scrollDriver';
import s from './Nav.module.css';

const LINKS = [
  { hash: '#work', label: 'Work' },
  { hash: '#process', label: 'Process' },
  { hash: '#team', label: 'Team' },
  { hash: '#services', label: 'Services' },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Same-page anchors on the home route, cross-route anchors everywhere else —
  // otherwise "Work" would trigger a full navigation from the page it already lives on.
  const onHome = pathname === '/';
  const to = (hash: string) => (onHome ? hash : `/${hash}`);

  // Nav condenses past 40px: background fades in, padding tightens 20px -> 14px.
  useEffect(
    () =>
      onScrollFrame(() => {
        const nav = navRef.current;
        if (!nav) return;
        const sy = window.scrollY || document.documentElement.scrollTop || 0;
        nav.dataset.scrolled = String(sy > 40);
      }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav ref={navRef} className={s.nav} data-scrolled="false" data-open={String(open)}>
        <Link href="/" className={s.brand} onClick={() => setOpen(false)}>
          <Logo className={s.logo} priority />
        </Link>

        <div className={s.links}>
          {LINKS.map((l) => (
            <a key={l.hash} href={to(l.hash)} className={s.link}>
              {l.label}
            </a>
          ))}
          <a href={to('#contact')} className={s.navCta}>
            Start a project
          </a>
          <button
            type="button"
            className={s.burger}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {open && (
        <div className={s.sheet}>
          {LINKS.map((l) => (
            <a key={l.hash} href={to(l.hash)} className={s.sheetLink} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href={to('#contact')} className={`cta ${s.sheetCta}`} onClick={() => setOpen(false)}>
            Start a project<span style={{ fontSize: 15 }}>→</span>
          </a>
        </div>
      )}
    </>
  );
}
