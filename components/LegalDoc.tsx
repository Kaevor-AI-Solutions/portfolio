import Link from 'next/link';
import type { ReactNode } from 'react';
import LegalToc from './LegalToc';
import Reveal from './Reveal';
import { LEGAL_DRAFT, type LegalDocument } from '@/lib/legal';
import s from './LegalDoc.module.css';

const INLINE_LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders the one piece of markup allowed in clause text: [label](href). */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  INLINE_LINK.lastIndex = 0;
  while ((match = INLINE_LINK.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const [full, label, href] = match;
    out.push(
      href.startsWith('/') ? (
        <Link key={match.index} href={href}>
          {label}
        </Link>
      ) : (
        <a key={match.index} href={href}>
          {label}
        </a>
      ),
    );
    last = match.index + full.length;
  }
  if (last < text.length) out.push(text.slice(last));

  return out;
}

/**
 * Shared shell for /terms and /privacy. Server-rendered so the clause text is in the
 * HTML for indexing — only the contents rail is a client component.
 */
export default function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <main className={s.main}>
      <section className={s.masthead}>
        <div className={s.mastheadInner}>
          <Link href="/" className={s.back}>
            ← Back to site
          </Link>

          <Reveal className={s.intro}>
            <span className="eyebrow">Legal</span>
            <h1 className={s.title}>{doc.title}</h1>
            <p className={s.standfirst}>{doc.standfirst}</p>
          </Reveal>

          {LEGAL_DRAFT && (
            <p className={s.draft}>
              <span className="monoLabel">Draft</span> This document is a working draft pending
              legal review. It is published for transparency and may change.
            </p>
          )}

          <div className={s.metaGrid}>
            {doc.meta.map((m) => (
              <div key={m.label} className={s.meta}>
                <span className="monoLabel">{m.label}</span>
                <span className={s.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.body}>
        <div className={s.bodyInner}>
          <LegalToc
            clauses={doc.clauses.map(({ id, no, heading }) => ({ id, no, heading }))}
          />

          <div className={s.clauses}>
            {doc.clauses.map((c) => (
              <article key={c.id} id={c.id} className={s.clause}>
                <span className={`monoLabel ${s.clauseNo}`}>{c.no}</span>
                <h2 className={s.clauseHeading}>{c.heading}</h2>
                {c.body.map((p, i) => (
                  <p key={i} className={s.paragraph}>
                    {inline(p)}
                  </p>
                ))}
                {c.list && (
                  <ul className={s.list}>
                    {c.list.map((item, i) => (
                      <li key={i}>{inline(item)}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
