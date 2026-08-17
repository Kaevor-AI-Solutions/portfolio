import Reveal from './Reveal';
import { FOUNDERS } from '@/lib/content';
import s from './Team.module.css';

export default function Team() {
  return (
    <section id="team" className={s.section}>
      <div className="container">
        <Reveal className={s.head}>
          <div className="sectionHead">
            <span className="eyebrow">Team</span>
            <h2 className="sectionTitle">Founder-led, systems-minded.</h2>
          </div>
          <p className={s.lede}>
            Three founders connecting product strategy, applied AI and production engineering.
          </p>
        </Reveal>

        <div className={s.grid}>
          {FOUNDERS.map((f, i) => (
            <Reveal
              as="a"
              key={f.name}
              index={i}
              href={f.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={s.card}
            >
              <span className={s.role}>{f.role}</span>
              <h3 className={s.name}>{f.name}</h3>
              <span className={s.profile}>
                LinkedIn<span aria-hidden="true">↗</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
