'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@/lib/auth';
import { COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';

const projects = [
  { name: 'E-commerce Platform', progress: 78, status: 'On track' },
  { name: 'CRM Migration', progress: 61, status: 'Review' },
  { name: 'Brand Refresh', progress: 43, status: 'In progress' },
];

const activities = [
  { user: 'AL', text: 'Alex Lima uploaded a new proposal', time: '12 min ago' },
  { user: 'MP', text: 'Marina Prado approved the sprint plan', time: '1 hour ago' },
  { user: 'WS', text: 'Will Santos scheduled a leadership review', time: '4 hours ago' },
];

export default function DashboardShell({ user }: { user: AuthUser }) {
  const router = useRouter();

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
    router.refresh();
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link href="/" className="brand brand-light">
            <span className="brand-mark">{COMPANY_INITIAL}</span>
            {COMPANY_NAME}<span className="brand-dot">.</span>
          </Link>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-label">Workspace</p>
          <nav className="side-nav" aria-label="Sidebar navigation">
            <Link className="nav-item active" href="/dashboard">
              <span className="nav-icon">◫</span>Overview
            </Link>
            <button className="nav-item" type="button">
              <span className="nav-icon">▣</span>Projects
            </button>
            <button className="nav-item" type="button">
              <span className="nav-icon">◎</span>Team
            </button>
            <button className="nav-item" type="button">
              <span className="nav-icon">◫</span>Calendar
            </button>
            <Link className="nav-item" href="/users">
              <span className="nav-icon">+</span>Users
            </Link>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="profile-box">
            <span className="avatar">{user.name.slice(0, 2).toUpperCase()}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </div>
          </div>

          <button className="nav-item" type="button" onClick={logout}>
            <span className="nav-icon">↪</span>Sign out
          </button>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow muted">Workspace overview</p>
            <h1>Dashboard</h1>
            <p className="muted">Signed in as {user.email}</p>
          </div>

          <div className="header-actions">
            <Link href="/users" className="ghost-button">+ New user</Link>
            <span className="avatar avatar-lg">{user.name.slice(0, 2).toUpperCase()}</span>
          </div>
        </header>

        <div className="dashboard-content">
          <section className="panel panel-lg">
            <div className="panel-top">
              <div>
                <p className="eyebrow">Overview</p>
                <h2>Performance summary</h2>
              </div>
              <button type="button" className="ghost-button subtle">This month</button>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span>Revenue</span>
                <strong>$48.2K</strong>
                <small className="positive">+12.4% vs last month</small>
              </div>
              <div className="stat-card">
                <span>Clients</span>
                <strong>128</strong>
                <small>Across 7 countries</small>
              </div>
              <div className="stat-card">
                <span>Projects</span>
                <strong>24</strong>
                <small>8 in delivery</small>
              </div>
              <div className="stat-card accent">
                <span>Next milestone</span>
                <strong>04</strong>
                <small>days to launch</small>
              </div>
            </div>
          </section>

          <div className="two-column">
            <section className="panel">
              <div className="panel-top">
                <div>
                  <p className="eyebrow">Pipeline</p>
                  <h3>Active projects</h3>
                </div>
                <button type="button" className="link-button">View all</button>
              </div>

              {projects.map((project) => (
                <div key={project.name} className="project-row">
                  <div className="project-copy">
                    <strong>{project.name}</strong>
                    <div className="progress-bar">
                      <span style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>

                  <div className="project-meta">
                    <span className="status-badge">{project.status}</span>
                    <small>{project.progress}%</small>
                  </div>
                </div>
              ))}
            </section>

            <section className="panel">
              <div className="panel-top">
                <div>
                  <p className="eyebrow">Activity</p>
                  <h3>Recent updates</h3>
                </div>
                <button type="button" className="link-button">All</button>
              </div>

              {activities.map((item) => (
                <div key={item.text} className="activity-row">
                  <span className="mini-avatar">{item.user}</span>
                  <div>
                    <strong>{item.text}</strong>
                    <small>{item.time}</small>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
