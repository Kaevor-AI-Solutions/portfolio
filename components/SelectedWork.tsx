'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import RevealLink from './RevealLink';
import { PROJECTS } from '@/lib/content';
import { clamp, onScrollFrame, prefersReducedMotion } from '@/lib/scrollDriver';
import { useIsomorphicLayoutEffect, useMediaQuery } from '@/lib/hooks';
import s from './SelectedWork.module.css';

const CASE_HREF = '/work/election-calculator';

export default function SelectedWork() {
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);
  return isDesktop ? <PinnedWork /> : <StackedWork />;
}

/* ------------------------------------------------------------------ */

function PinnedWork() {
  const pinRef = useRef<HTMLElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  /**
   * The track has to fit inside the sticky pane at any viewport height. Narrowing a
   * card makes its meta text wrap taller, so width alone cannot resolve a short
   * viewport — degrade content density in steps, measuring the real height each time.
   */
  useIsomorphicLayoutEffect(() => {
    const pane = paneRef.current;
    const head = headRef.current;
    const track = trackRef.current;
    if (!pane || !head || !track) return;

    const applyLayout = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-card]'));
      if (!cards.length) return;

      const vh = window.innerHeight;
      const bottom = 48;

      head.style.padding = `${Math.max(48, Math.min(104, Math.round(vh * 0.115)))}px 48px 0`;
      const band = Math.ceil(head.getBoundingClientRect().height) + 26;

      pane.style.justifyContent = 'flex-start';
      pane.style.padding = `${band}px 0 ${bottom}px`;
      track.style.alignItems = 'flex-start';

      const avail = Math.max(200, vh - band - bottom);

      const ws = cards.map((c) => Number(c.dataset.w));
      const ms = cards.map((c) => Number(c.dataset.mt));
      const parts = cards.map((c) => {
        const meta = c.querySelector<HTMLElement>('[data-card-meta]');
        return {
          tags: (meta?.firstElementChild as HTMLElement | null) ?? null,
          desc: (meta?.querySelectorAll('p')[0] as HTMLElement | undefined) ?? null,
        };
      });

      const setLevel = (lv: number) =>
        parts.forEach((p) => {
          if (p.desc) p.desc.style.display = lv >= 1 ? 'none' : '';
          if (p.tags) p.tags.style.display = lv >= 2 ? 'none' : 'flex';
        });

      const tallest = () =>
        cards.reduce(
          (m, c) => Math.max(m, c.getBoundingClientRect().height + (parseFloat(c.style.marginTop) || 0)),
          0,
        );

      let done = false;
      for (let lv = 0; lv <= 2 && !done; lv++) {
        setLevel(lv);
        for (let k = 1; k >= 0.5; k -= 0.05) {
          // Short viewports compress the up/down rhythm rather than losing it — the
          // alternation is the point of the layout, so it holds until space runs out.
          const offs = k < 0.75 ? 0.45 : 1;
          cards.forEach((c, j) => {
            c.style.width = `${Math.round(ws[j] * k)}px`;
            c.style.marginTop = `${Math.round(ms[j] * k * offs)}px`;
          });
          if (tallest() <= avail) {
            done = true;
            break;
          }
        }
      }

      if (!done) {
        // Last resort: clamp the media box so the card fits whatever is left.
        const over = tallest() - avail;
        cards.forEach((c) => {
          const media = c.querySelector<HTMLElement>('[data-card-media]');
          if (!media) return;
          const h = media.getBoundingClientRect().height;
          media.style.aspectRatio = 'auto';
          media.style.height = `${Math.max(96, h - over)}px`;
        });
      } else {
        cards.forEach((c) => {
          const media = c.querySelector<HTMLElement>('[data-card-media]');
          if (media) {
            media.style.aspectRatio = '16/9';
            media.style.height = '';
          }
        });
      }
    };

    applyLayout();
    if (document.fonts?.ready) document.fonts.ready.then(applyLayout);
    window.addEventListener('resize', applyLayout);
    return () => window.removeEventListener('resize', applyLayout);
  }, []);

  // Scrub: pin progress drives the horizontal translate, the progress rule and the counter.
  useEffect(
    () =>
      onScrollFrame(() => {
        const pin = pinRef.current;
        const track = trackRef.current;
        if (!pin || !track) return;

        const h = window.innerHeight;
        const r = pin.getBoundingClientRect();
        const pp = clamp(-r.top / Math.max(1, r.height - h));

        const max = Math.max(0, track.scrollWidth - window.innerWidth + 48);
        track.style.transform = `translate3d(${(-pp * max).toFixed(1)}px,0,0)`;

        if (fillRef.current) fillRef.current.style.transform = `scaleX(${pp.toFixed(3)})`;
        if (countRef.current) {
          countRef.current.textContent = `0${Math.min(4, Math.floor(pp * 3.999) + 1)}`;
        }
      }),
    [],
  );

  return (
    <section id="work" ref={pinRef} className={s.pin}>
      <div ref={paneRef} className={s.pane}>
        <div ref={headRef} className={s.head}>
          <div className="sectionHead">
            <span className="eyebrow">Selected work</span>
            <h2 className="sectionTitle">Proof, practice, and the systems between.</h2>
          </div>
          <div className={s.counter}>
            <span ref={countRef}>01</span>
            <span className={s.bar}>
              <span ref={fillRef} className={s.barFill} />
            </span>
            <span>04</span>
          </div>
        </div>

        <div ref={trackRef} className={s.track}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className={s.hint}>Scroll to advance</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  // Image reveal + subtle tilt, mouse-position-driven, capped well under 4°.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const media = card.querySelector<HTMLElement>('[data-card-media]');
    const scrim = card.querySelector<HTMLElement>('[data-card-scrim]');
    const reduced = prefersReducedMotion();

    const enter = () => {
      if (media) media.style.borderColor = '#3ED0C4';
      if (scrim) scrim.style.opacity = '0';
    };
    const move = (ev: MouseEvent) => {
      if (reduced) return;
      const r = card.getBoundingClientRect();
      const nx = (ev.clientX - r.left) / r.width - 0.5;
      const ny = (ev.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform .15s ease-out';
      card.style.transform =
        `perspective(1400px) rotateY(${(nx * 3.4).toFixed(2)}deg) ` +
        `rotateX(${(-ny * 3).toFixed(2)}deg) translateY(-6px)`;
    };
    const out = () => {
      card.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1)';
      if (media) media.style.borderColor = '#22262B';
      if (scrim) {
        scrim.style.opacity = '1';
        scrim.style.background = 'linear-gradient(170deg,rgba(62,208,196,.06),rgba(10,11,13,.55))';
      }
      card.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg) translateY(0)';
    };

    card.addEventListener('mouseenter', enter);
    card.addEventListener('mousemove', move);
    card.addEventListener('mouseleave', out);
    return () => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mousemove', move);
      card.removeEventListener('mouseleave', out);
    };
  }, []);

  return (
    <Link
      ref={cardRef}
      href={CASE_HREF}
      data-card=""
      data-w={project.width}
      data-mt={project.marginTop}
      className={s.card}
      style={{ width: project.width, marginTop: project.marginTop }}
    >
      <div data-card-media="" className={s.media}>
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 1023px) 100vw, 720px"
          priority={project.no === '01'}
        />
        <div data-card-scrim="" className={s.scrim} />
        <div className={s.cardNo}>{project.no}</div>
      </div>

      <div data-card-meta="" className={s.meta}>
        <div className={s.tags}>
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        <h3 className={s.cardTitle}>{project.title}</h3>
        <p className={s.cardBody}>{project.description}</p>
        <p className="outcome">{project.outcome}</p>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */

function StackedWork() {
  return (
    <section id="work" className={s.stack}>
      <div className={s.stackHead}>
        <span className="eyebrow">Selected work</span>
        <h2 className="sectionTitle">Proof, practice, and the systems between.</h2>
      </div>

      <div className={s.stackList}>
        {PROJECTS.map((p, i) => (
          <RevealLink key={p.slug} index={i} href={CASE_HREF} className={s.stackCard}>
            <div className={s.stackMedia}>
              <Image src={p.image} alt={p.alt} fill sizes="100vw" />
            </div>
            <h3 className={s.stackTitle}>{p.mobileTitle ?? p.title}</h3>
            <p className={s.stackBody}>{p.mobileDescription}</p>
            <span className={s.stackOutcome}>{p.mobileOutcome}</span>
          </RevealLink>
        ))}
      </div>
    </section>
  );
}
