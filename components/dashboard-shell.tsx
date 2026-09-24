'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { AuthUser } from '@/lib/auth';
import { COMPANY_INITIAL, COMPANY_NAME } from '@/lib/brand';
import styles from './dashboard-shell.module.css';

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
    <main className={styles.dashboardShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}><Link href="/" className={styles.brand}><span className={styles.brandMark}>{COMPANY_INITIAL}</span>{COMPANY_NAME}<span className={styles.brandDot}>.</span></Link></div>
        <div className={styles.sidebarSection}>
          <p className={styles.sidebarLabel}>Workspace</p>
          <nav className={styles.sideNav} aria-label="Sidebar navigation">
            <Link className={`${styles.navItem} ${styles.active}`} href="/dashboard"><span className={styles.navIcon}>◫</span>Overview</Link>
            <button className={styles.navItem} type="button"><span className={styles.navIcon}>▣</span>Projects</button>
            <button className={styles.navItem} type="button"><span className={styles.navIcon}>◎</span>Team</button>
            <button className={styles.navItem} type="button"><span className={styles.navIcon}>◫</span>Calendar</button>
            <Link className={styles.navItem} href="/users"><span className={styles.navIcon}>+</span>Users</Link>
          </nav>
        </div>
        <div className={styles.sidebarFooter}>
          <div className={styles.profileBox}><span className={styles.avatar}>{user.name.slice(0, 2).toUpperCase()}</span><div><strong>{user.name}</strong><small>{user.role}</small></div></div>
          <button className={styles.navItem} type="button" onClick={logout}><span className={styles.navIcon}>↪</span>Sign out</button>
        </div>
      </aside>

      <section className={styles.dashboardMain}>
        <header className={styles.dashboardHeader}><div><p className={styles.eyebrow}>Workspace overview</p><h1>Dashboard</h1><p className={styles.muted}>Signed in as {user.email}</p></div><div className={styles.headerActions}><Link href="/users" className={styles.ghostButton}>+ New user</Link><span className={`${styles.avatar} ${styles.avatarLarge}`}>{user.name.slice(0, 2).toUpperCase()}</span></div></header>
        <div className={styles.dashboardContent}>
          <section className={`${styles.panel} ${styles.panelLarge}`}><div className={styles.panelTop}><div><p className={styles.eyebrow}>Overview</p><h2>Performance summary</h2></div><button type="button" className={`${styles.ghostButton} ${styles.subtle}`}>This month</button></div><div className={styles.statsGrid}><div className={styles.statCard}><span>Revenue</span><strong>$48.2K</strong><small className={styles.positive}>+12.4% vs last month</small></div><div className={styles.statCard}><span>Clients</span><strong>128</strong><small>Across 7 countries</small></div><div className={styles.statCard}><span>Projects</span><strong>24</strong><small>8 in delivery</small></div><div className={`${styles.statCard} ${styles.accent}`}><span>Next milestone</span><strong>04</strong><small>days to launch</small></div></div></section>
          <div className={styles.twoColumn}><section className={styles.panel}><div className={styles.panelTop}><div><p className={styles.eyebrow}>Pipeline</p><h3>Active projects</h3></div><button type="button" className={styles.linkButton}>View all</button></div>{projects.map((project)=><div key={project.name} className={styles.projectRow}><div className={styles.projectCopy}><strong>{project.name}</strong><div className={styles.progressBar}><span style={{width:`${project.progress}%`}} /></div></div><div className={styles.projectMeta}><span className={styles.statusBadge}>{project.status}</span><small>{project.progress}%</small></div></div>)}</section><section className={styles.panel}><div className={styles.panelTop}><div><p className={styles.eyebrow}>Activity</p><h3>Recent updates</h3></div><button type="button" className={styles.linkButton}>All</button></div>{activities.map((item)=><div key={item.text} className={styles.activityRow}><span className={styles.miniAvatar}>{item.user}</span><div><strong>{item.text}</strong><small>{item.time}</small></div></div>)}</section></div>
        </div>
      </section>
    </main>
  );
}
