import Reveal from './Reveal';
import { SERVICES } from '@/lib/content';
import s from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className={s.section}>
      <div className="container">
        <Reveal className={s.head}>
          <div className="sectionHead">
            <span className="eyebrow">What we do</span>
            <h2 className="sectionTitle">Our services</h2>
          </div>
          <p className={s.lede}>
            Six practices that take a product from the first architecture decision to a platform
            your team can run without us.
          </p>
        </Reveal>

        <div className={s.grid}>
          {SERVICES.map((c, i) => (
            <Reveal key={c.title} index={i} className={s.cell}>
              <h3 className={s.cellTitle}>{c.title}</h3>
              <p className={s.cellBody}>{c.body}</p>
              <span className={s.cellMeta}>{c.meta}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
