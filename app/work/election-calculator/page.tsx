import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import RevealLink from '@/components/RevealLink';
import s from './case.module.css';

export const metadata: Metadata = {
  title: 'Election Calculator — Kaevor AI Solutions',
  description:
    'A district-by-district simulator for exploring potential seat distribution in Sri Lanka’s 2024 parliamentary election.',
};

const FACTS = [
  { label: 'Type', value: 'Founder-built civic technology' },
  { label: 'Engagement', value: '48-hour public build' },
  { label: 'Builder', value: 'Pavithiran Sivaganesh' },
  { label: 'Focus', value: 'Web app · Data modelling · Visualisation' },
];

const STATS = [
  { value: '48h', label: 'from concept to public launch' },
  { value: 'District', label: 'vote assumptions entered at local level' },
  { value: 'Seats', label: 'projected distribution made visual' },
  { value: 'Public', label: 'browser-based release for open exploration' },
];

const SHIPPED = [
  {
    no: '01',
    title: 'District inputs',
    body: 'A structured way to enter expected party vote counts by district.',
  },
  {
    no: '02',
    title: 'Projection model',
    body: 'Vote assumptions translated into an explorable seat scenario.',
  },
  {
    no: '03',
    title: 'Visual results',
    body: 'Projected parliamentary seat distribution made immediately legible.',
  },
  {
    no: '04',
    title: 'Public web release',
    body: 'An accessible browser experience launched for open exploration.',
  },
];

export default function ElectionCalculatorCase() {
  return (
    <main className={s.main}>
      <section className={s.masthead}>
        <div className={s.mastheadInner}>
          <Link href="/#work" className={s.back}>
            ← All work
          </Link>

          <div className={s.intro}>
            <span className="eyebrow">Case 01 · Founder work</span>
            <h1 className={s.title}>Election Calculator</h1>
            <p className={s.standfirst}>
              A district-by-district simulator for exploring potential seat distribution in Sri
              Lanka’s 2024 parliamentary election.
            </p>
          </div>

          <div className={s.factGrid}>
            {FACTS.map((f) => (
              <div key={f.label} className={s.fact}>
                <span className="monoLabel">{f.label}</span>
                <span className={s.factValue}>{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={s.heroWrap}>
        <Reveal className={s.heroFrame}>
          <Image
            src="/assets/selected-work/election-calculator.png"
            alt="Election Calculator — district scenario dashboard"
            fill
            sizes="(max-width: 1439px) 100vw, 1440px"
            priority
          />
        </Reveal>
      </section>

      <section className={s.block}>
        <div className={s.stats}>
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} index={i} className={s.stat}>
              <span className={s.statValue}>{stat.value}</span>
              <span className={s.statLabel}>{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={s.block}>
        <div className={s.narrative}>
          <Reveal className={s.row}>
            <span className={s.rowLabel}>The problem</span>
            <div className={s.rowBody}>
              <p className={s.lead}>
                Election outcomes are difficult to reason about when vote assumptions live in
                disconnected spreadsheets and static commentary.
              </p>
              <p className={s.support}>
                The useful question is not only who may win, but how different district-level
                assumptions change the projected distribution of parliamentary seats.
              </p>
            </div>
          </Reveal>

          <Reveal index={1} className={s.row}>
            <span className={s.rowLabel}>The approach</span>
            <div className={s.rowBody}>
              <p className={s.lead}>
                Turn district vote assumptions into an interactive model, then visualise projected
                parliamentary seat distribution in one browser-based workflow.
              </p>
              <p className={s.support}>
                The first public version was deliberately built in 48 hours to test the model and
                make the concept available for real use and feedback.
              </p>
            </div>
          </Reveal>

          <Reveal index={2} className={s.row}>
            <span className={s.rowLabel}>What shipped</span>
            <div className={s.shipped}>
              {SHIPPED.map((item) => (
                <div key={item.no} className={s.shippedCard}>
                  <span className={s.shippedNo}>{item.no}</span>
                  <span className={s.shippedTitle}>{item.title}</span>
                  <span className={s.shippedBody}>{item.body}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className={s.block}>
        <Reveal className={s.quoteWrap}>
          <p className={s.quote}>
            Built as a public experiment in turning complex election assumptions into something
            people can explore.
          </p>
          <span className="monoLabel">Founder work evidence · LinkedIn project announcement</span>
        </Reveal>
      </section>

      <section className={s.nextWrap}>
        <RevealLink href="/#work" className={s.next}>
          <span className={s.nextMeta}>
            <span className="monoLabel">Next case</span>
            <span className={s.nextTitle}>Applied AI Systems</span>
          </span>
          <span className={s.nextHint}>Production-oriented AI workflows →</span>
        </RevealLink>
      </section>

      <Footer />
    </main>
  );
}
