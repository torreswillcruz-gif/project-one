import Link from 'next/link';
import { COMPANY_EMAIL, COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';
import styles from './company-home.module.css';

const services = [
  { number: '01', title: 'Strategy & clarity', text: 'We uncover the signal in the noise and turn big ideas into clear direction.' },
  { number: '02', title: 'Digital solutions', text: 'We design and build thoughtful solutions that feel simple and scale with your business.' },
  { number: '03', title: 'Business systems', text: 'We create practical systems that help your team work with confidence.' },
];

export default function CompanyHome() {
  return (
    <>
      <header className={styles.siteHeader}>
        <div className="container navWrap">
          <Link href="/" className={styles.brand} aria-label={`${COMPANY_NAME} home`}>
            <span className={styles.brandMark}>{COMPANY_INITIAL}</span>
            {COMPANY_NAME}<span className={styles.brandDot}>.</span>
          </Link>

          <nav className={styles.mainNav} aria-label="Main navigation">
            <Link href="#services">Services</Link>
            <Link href="#about">About</Link>
            <Link href="#contact">Contact</Link>
            <Link href="/login" className={styles.buttonDark}>Login</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="container hero">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{COMPANY_NAME} · Est. 2016</p>
            <h1>Make complex things <span>matter.</span></h1>
            <p className={styles.heroText}>Will Solutions helps ambitious teams turn complex ideas into clear, useful digital products that move people and businesses forward.</p>
            <div className={styles.heroActions}>
              <Link href="/login" className="button buttonDark">Start a project</Link>
              <Link href="#services">Explore services</Link>
            </div>
          </div>

          <div className={styles.heroVisual} aria-hidden="true" />
        </section>

        <section className={styles.logoStrip}>
          <div className="container logoList">
            <span>Strategy</span>
            <span>Design</span>
            <span>Technology</span>
            <span>Growth</span>
          </div>
        </section>

        <section id="services" className="section container">
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>What we do</p>
            <h2>From first thought<br />to lasting impact.</h2>
          </div>

          <div className={styles.cardGrid}>
            {services.map((service) => (
              <article key={service.number}>
                <span className={styles.cardNumber}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href="#contact">Learn more</Link>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section sectionMuted">
          <div className="container aboutBlock">
            <p className={styles.eyebrow}>About {COMPANY_NAME}</p>
            <h2>We believe the best work happens when <span>clarity meets action.</span></h2>
            <p>We partner with organizations that want to turn good ideas into meaningful, measurable progress.</p>
          </div>
        </section>

        <section id="contact" className="section container contactBlock">
          <div>
            <p className={styles.eyebrow}>Have a good question?</p>
            <h2>Let’s build your<br /><span>next solution.</span></h2>
          </div>
          <div>
            <p>Tell us a little about what you’re working on. We’ll get back to you within two working days.</p>
            <a href={`mailto:${COMPANY_EMAIL}`} className={styles.contactLink}>{COMPANY_EMAIL}</a>
          </div>
        </section>
      </main>

      <footer className={styles.siteFooter}>
        <div className="container footerRow">
          <Link href="/" className={`${styles.brand} ${styles.brandLight}`}>
            <span className={styles.brandMark}>{COMPANY_INITIAL}</span>
            {COMPANY_NAME}<span className={styles.brandDot}>.</span>
          </Link>
          <div className={styles.footerLinks}>
            <Link href="/login">Login</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
