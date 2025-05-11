import  ProtectedRoute  from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Dashboard Overview</h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome to your personal dashboard. From here you can manage your portfolio.
          </p>

          <div className="mt-8">
            <h3 className="text-md font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/portfolio"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <p className="text-indigo-600 font-medium">View Portfolio</p>
                  <p className="text-sm text-gray-500 mt-1">See all your work samples</p>
                </div>
              </Link>
              <Link
                href="/portfolio/new"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <p className="text-indigo-600 font-medium">Add New Item</p>
                  <p className="text-sm text-gray-500 mt-1">Showcase your latest work</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}