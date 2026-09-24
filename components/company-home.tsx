'use client';

import Link from 'next/link';

const services = [
  { number: '01', title: 'Strategy & clarity', text: 'We uncover the signal in the noise and turn big ideas into clear direction.' },
  { number: '02', title: 'Digital products', text: 'We design and build thoughtful product experiences that feel simple and scalable.' },
  { number: '03', title: 'Brand systems', text: 'We create memorable visuals and consistent systems that help teams show up with confidence.' },
];

const projects = [
  { name: 'Aurora Health', type: 'Brand strategy · Digital product', theme: 'aurora' },
  { name: 'Field Notes', type: 'Editorial platform · E-commerce', theme: 'field' },
];

export default function CompanyHome() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Northstar home">
            <span className="brand-mark">N</span>
            northstar<span className="brand-dot">.</span>
          </Link>

          <nav className="main-nav" aria-label="Main navigation">
            <Link href="#services">Services</Link>
            <Link href="#work">Work</Link>
            <Link href="#about">About</Link>
            <Link href="/login" className="button button-small">Sign in</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">Independent digital studio • Est. 2016</p>
            <h1>Make complex things <span>matter.</span></h1>
            <p className="hero-text">Northstar helps ambitious teams turn complex ideas into clear, useful digital products that move people and businesses forward.</p>
            <div className="hero-actions">
              <Link href="/login" className="button">Start a project <span aria-hidden="true">↗</span></Link>
              <Link href="#work" className="text-link">See our work <span aria-hidden="true">↓</span></Link>
            </div>
          </div>

          <div className="hero-art" aria-label="brand art">
            <span>Find<br />your north</span>
          </div>
        </section>

        <div className="logo-strip">
          <div className="container logo-list">
            <span>Arcadia</span>
            <span>daylight</span>
            <span>◎ Morrow</span>
            <span>Vanta</span>
            <span>halcyon</span>
          </div>
        </div>

        <section id="services" className="section container">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>From first thought<br />to lasting impact.</h2>
          </div>

          <div className="card-grid">
            {services.map((service) => (
              <article className={service.number === '02' ? 'card-featured' : ''} key={service.number}>
                <span className="service-number">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <Link href="/login" className="inline-link">Learn more <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="section section-soft">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Good work gets<br />noticed.</h2>
              </div>
              <Link href="/dashboard" className="text-link">View all projects <span aria-hidden="true">↗</span></Link>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className={`project-card ${project.theme}`}>
                  <div className="project-visual">
                    <span>{project.name === 'Aurora Health' ? 'aurora' : 'field notes'}</span>
                  </div>
                  <div className="project-meta">
                    <div>
                      <h3>{project.name}</h3>
                      <p>{project.type}</p>
                    </div>
                    <span className="circle-arrow">↗</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section container about-block">
          <div className="about-copy">
            <p className="eyebrow">A little about us</p>
            <h2>We believe the best work happens when <span>curiosity meets craft.</span></h2>
          </div>
        </section>

        <section id="contact" className="section container contact-block">
          <div>
            <p className="eyebrow">Have a good question?</p>
            <h2>Let’s find your <span>north.</span></h2>
          </div>

          <div className="contact-copy">
            <p>Tell us a little about what you’re working on. We’ll get back to you within two working days.</p>
            <a href="mailto:hello@northstar.studio" className="email-link">hello@northstar.studio <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-row">
          <Link href="/" className="brand brand-light">
            <span className="brand-mark">N</span>
            northstar<span className="brand-dot">.</span>
          </Link>
          <div className="footer-links">
            <Link href="#services">Services</Link>
            <Link href="#work">Work</Link>
            <Link href="#about">About</Link>
            <Link href="mailto:hello@northstar.studio">Contact</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
