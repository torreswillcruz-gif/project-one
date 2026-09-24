import type { Metadata } from 'next';
import './globals.css';
import '../components/company-home.module.css';
import '../components/login-form.module.css';
import '../components/user-registration.module.css';
import '../components/dashboard-shell.module.css';

export const metadata: Metadata = {
  title: 'Will Solutions | Company Dashboard',
  description: 'Will Solutions company website and workspace dashboard.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
