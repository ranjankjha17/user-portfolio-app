import LoginForm from '@/components/LoginForm';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}