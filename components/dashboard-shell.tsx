'use client';

import { useState } from 'react';

const projects = [
  { name: 'Aurora Health', type: 'Brand strategy · Digital product', status: 'In progress', progress: 72, color: 'coral' },
  { name: 'Field Notes', type: 'Editorial platform · E-commerce', status: 'Review', progress: 48, color: 'gold' },
  { name: 'Morrow Finance', type: 'Product design · Development', status: 'Planning', progress: 18, color: 'blue' },
];

const activities = [
  ['AM', 'Alex Morgan uploaded a new file', 'Aurora Health / homepage-v3.fig', '12 min ago'],
  ['JW', 'Jordan Wu commented on a task', '“The new direction feels great.”', '1 hr ago'],
  ['SK', 'Sam Kim completed a milestone', 'Field Notes / content migration', '3 hrs ago'],
];

export default function DashboardShell() {
  const [active, setActive] = useState('Overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);

  return (
    <main className="dashboard">
      <aside className={menuOpen ? 'sidebar open' : 'sidebar'}>
        <a className="dash-brand" href="/"> <span className="brand-mark">N</span> northstar<span>.</span></a>
        <p className="workspace-label">Workspace</p>
        <nav className="side-nav" aria-label="Dashboard navigation">
          {['Overview', 'Projects', 'Team', 'Calendar'].map((item) => <button className={active === item ? 'nav-item active' : 'nav-item'} key={item} onClick={() => { setActive(item); setMenuOpen(false); }}><span className="nav-icon">{item === 'Overview' ? '◫' : item === 'Projects' ? '◈' : item === 'Team' ? '◎' : '□'}</span>{item}</button>)}
        </nav>
        <div className="sidebar-bottom"><button className="nav-item"><span className="nav-icon">⚙</span>Settings</button><a className="user-mini" href="/"><span className="avatar">TC</span><span><strong>Torres Cruz</strong><small>Admin</small></span><span className="more">···</span></a></div>
      </aside>
      <section className="dashboard-content">
        <header className="dash-header"><button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">☰</button><div><p className="dash-kicker">Thursday, September 24, 2026</p><h1>Good morning, Torres<span>.</span></h1></div><div className="header-actions"><button className="icon-button" onClick={() => setNotifications(!notifications)} aria-label="Notifications">♧<i /></button>{notifications && <div className="notification-popover">You’re all caught up.</div>}<span className="avatar avatar-large">TC</span></div></header>
        <div className="dashboard-body">
          <div className="overview-head"><div><p className="eyebrow">Your workspace</p><h2>Here’s what’s happening.</h2></div><button className="button create-button" onClick={() => alert('New project flow ready to connect.')}>+ New project</button></div>
          <div className="stats-grid"><div className="stat-card"><span>Active projects</span><strong>06</strong><small className="positive">↑ 2 this month</small></div><div className="stat-card"><span>Team members</span><strong>12</strong><small>Across 4 teams</small></div><div className="stat-card"><span>Hours this month</span><strong>184<span className="unit">h</span></strong><small className="positive">↑ 12% from last month</small></div><div className="stat-card highlight"><span>Next milestone</span><strong>04<span className="unit"> days</span></strong><small>Aurora Health launch</small></div></div>
          <div className="content-grid"><section className="panel projects-panel"><div className="panel-heading"><div><p className="eyebrow">Overview</p><h3>Active projects</h3></div><button className="filter-button">This month⌄</button></div>{projects.map((project) => <div className="project-row" key={project.name}><span className={`project-thumb ${project.color}`}>{project.name.slice(0, 1)}</span><div className="project-info"><strong>{project.name}</strong><small>{project.type}</small><div className="progress-track"><span style={{ width: `${project.progress}%` }} /></div></div><span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>{project.status}</span><b className="progress-number">{project.progress}%</b></div>)}<button className="view-all">View all projects ↗</button></section><section className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Live feed</p><h3>Recent activity</h3></div><button className="more-button" aria-label="More activity options">···</button></div>{activities.map(([initials, title, detail, time]) => <div className="activity-row" key={title}><span className="avatar">{initials}</span><div><strong>{title}</strong><small>{detail}</small><time>{time}</time></div></div>)}<button className="view-all">See all activity ↗</button></section></div>
        </div>
      </section>
    </main>
  );
}
