'use client'
import  ProtectedRoute  from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthProvider';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-500">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900">Dashboard Content</h2>
            <p className="mt-2 text-sm text-gray-600">
              This is your protected dashboard page.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}