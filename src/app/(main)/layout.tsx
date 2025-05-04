import { redirect } from 'next/navigation';
import { auth } from '../api/auth/[...nextauth]/route';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}