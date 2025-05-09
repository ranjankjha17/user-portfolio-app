// 'use client'
// import ProtectedRoute from '@/components/ProtectedRoute';
// import { useAuth } from '@/context/AuthProvider';
// import Link from 'next/link';

// export default function DashboardPage() {
//   const { user, logout } = useAuth();

//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-50">

//         <nav className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16">
//               <div className="flex items-center space-x-4">
//                 <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900">
//                   Dashboard
//                 </Link>
//                 <Link href="/portfolio" className="text-sm font-medium text-gray-700 hover:text-gray-900">
//                   Portfolio
//                 </Link>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <span className="text-sm font-medium text-gray-500">
//                   Welcome, {user?.name}
//                 </span>
//                 <button
//                   onClick={logout}
//                   className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
//                 >
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </nav>
//         <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="bg-white p-6 rounded-lg shadow-sm">
            
//             <div className="mt-8">
//               <h2 className="text-xl font-semibold mb-4">Your Portfolio</h2>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 {/* Sample portfolio items or link to portfolio */}
//                 <Link
//                   href="/portfolio"
//                   className="p-4 border rounded-lg hover:bg-gray-50"
//                 >
//                   <div className="text-center">
//                     <p className="text-indigo-600 font-medium">View Your Portfolio</p>
//                     <p className="text-sm text-gray-500 mt-1">Manage your work samples</p>
//                   </div>
//                 </Link>
//                 <Link
//                   href="/portfolio/new"
//                   className="p-4 border rounded-lg hover:bg-gray-50"
//                 >
//                   <div className="text-center">
//                     <p className="text-indigo-600 font-medium">Add New Item</p>
//                     <p className="text-sm text-gray-500 mt-1">Showcase your work</p>
//                   </div>
//                 </Link>
//               </div>
//             </div>

//           </div>
//         </main>
//       </div>
//     </ProtectedRoute>
//   );
// }





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
              <Link
                href="/profile"
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="text-center">
                  <p className="text-indigo-600 font-medium">Edit Profile</p>
                  <p className="text-sm text-gray-500 mt-1">Update your account details</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}