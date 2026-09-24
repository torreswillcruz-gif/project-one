import Link from 'next/link';
import { COMPANY_EMAIL, COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';

const services = [
  { number: '01', title: 'Strategy & clarity', text: 'We uncover the signal in the noise and turn big ideas into clear direction.' },
  { number: '02', title: 'Digital solutions', text: 'We design and build thoughtful solutions that feel simple and scale with your business.' },
  { number: '03', title: 'Business systems', text: 'We create practical systems that help your team work with confidence.' },
];

export default function CompanyHome() {
  return <>
    <header className="site-header"><div className="container nav-wrap">
      <Link href="/" className="brand" aria-label={`${COMPANY_NAME} home`}><span className="brand-mark">{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className="brand-dot">.</span></Link>
      <nav className="main-nav" aria-label="Main navigation"><Link href="#services">Services</Link><Link href="#about">About</Link><Link href="#contact">Contact</Link><Link href="/login" className="button button-small">Sign in</Link></nav>
    </div></header>

    <main>
      <section className="hero container"><div className="hero-copy"><p className="eyebrow">{COMPANY_NAME} · Est. 2016</p><h1>Make complex things <span>matter.</span></h1><p className="hero-text">{COMPANY_NAME} helps ambitious teams turn complex ideas into clear, useful digital solutions that move people and businesses forward.</p><div className="hero-actions"><Link href="#contact" className="button">Start a project <span>↗</span></Link><Link href="#services" className="text-link">Explore services <span>↓</span></Link></div></div></section>
      <section className="logo-strip"><div className="container logo-list"><span>Strategy</span><span>Design</span><span>Technology</span><span>Growth</span></div></section>
      <section id="services" className="section container"><div className="section-heading"><p className="eyebrow">What we do</p><h2>From first thought<br />to lasting impact.</h2></div><div className="card-grid">{services.map((service) => <article className={service.number === '02' ? 'card-featured' : ''} key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><Link href="/login" className="inline-link">Learn more ↗</Link></article>)}</div></section>
      <section id="about" className="section section-muted"><div className="container about-block"><p className="eyebrow">About {COMPANY_NAME}</p><h2>We believe the best work happens when <span>clarity meets action.</span></h2><p className="about-text">We partner with organizations that want to turn good ideas into meaningful, measurable progress.</p></div></section>
      <section id="contact" className="section container contact-block"><div><p className="eyebrow">Have a good question?</p><h2>Let’s build your<br /><span>next solution.</span></h2></div><div className="contact-copy"><p>Tell us a little about what you’re working on. We’ll get back to you within two working days.</p><a href={`mailto:${COMPANY_EMAIL}`} className="email-link">{COMPANY_EMAIL} ↗</a></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-row"><Link href="/" className="brand brand-light"><span className="brand-mark">{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className="brand-dot">.</span></Link><div className="footer-links"><Link href="#services">Services</Link><Link href="#about">About</Link><Link href="#contact">Contact</Link></div><span>© 2024 {COMPANY_NAME}</span></div></footer>
  </>;
}
