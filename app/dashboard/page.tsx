import { redirect } from 'next/navigation';
import DashboardShell from '@/components/dashboard-shell';
import { getAuthenticatedUser } from '@/lib/auth';

export default async function DashboardPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');
  return <DashboardShell user={user} />;
}
