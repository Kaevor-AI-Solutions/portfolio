import Link from 'next/link';
import Logo from './Logo';
import s from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.top}>
        <div className={s.brandCol}>
          <div className={s.brand}>
            <Logo className={s.logo} />
          </div>
          <p className={s.blurb}>
            Applied AI and product engineering for teams that need real systems, not isolated
            demonstrations.
          </p>
        </div>

        <div className={s.col}>
          <span className="monoLabel">Work</span>
          <a href="#work" className={s.link}>
            Election Calculator
          </a>
          <a href="#work" className={s.link}>
            Applied AI Systems
          </a>
          <a href="#work" className={s.link}>
            Product Platforms
          </a>
          <a href="#work" className={s.link}>
            Quality Engineering
          </a>
        </div>

        <div className={s.col}>
          <span className="monoLabel">Studio</span>
          <a href="#process" className={s.link}>
            Process
          </a>
          <a href="#team" className={s.link}>
            Team
          </a>
          <a href="#services" className={s.link}>
            Services
          </a>
          <a href="#contact" className={s.link}>
            Contact
          </a>
        </div>

        <div className={s.col}>
          <span className="monoLabel">Elsewhere</span>
          <a href="#" className={s.link}>
            GitHub
          </a>
          <a href="#" className={s.link}>
            LinkedIn
          </a>
          <a href="#" className={s.link}>
            Engineering notes
          </a>
        </div>
      </div>

      <div className={s.bottom}>
        <span className={s.legal}>
          <span>© 2026 Kaevor AI Solutions</span>
          <Link href="/terms" className={s.legalLink}>
            Terms
          </Link>
          <Link href="/privacy" className={s.legalLink}>
            Privacy
          </Link>
        </span>
        <span>Sri Lanka · Founder-led</span>
      </div>
    </footer>
  );
}
