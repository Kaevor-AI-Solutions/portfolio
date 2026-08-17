import Reveal from './Reveal';
import s from './BuiltFor.module.css';

const DOMAINS = ['Applied AI', 'Product Platforms', 'Decision Systems', 'Web & Mobile'];

export default function BuiltFor() {
  return (
    <section className={s.strip}>
      <div className={s.row}>
        <div className={s.label}>Built for</div>
        {DOMAINS.map((d, i) => (
          <Reveal key={d} index={i} className={s.item}>
            {d}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
