'use client'
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthProvider';
import Image from 'next/image';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Your Profile</h2>

          <div className="mt-6 space-y-4">
            {user?.profileImage && (
              <div className="flex justify-center mb-4">
                {/* <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                /> */}

                <Image
                  src={user.profileImage}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                  height={100}
                  width={100}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-sm text-gray-900">{user?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
            </div>

            {user?.jobTitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                <p className="mt-1 text-sm text-gray-900">{user.jobTitle}</p>
              </div>
            )}

            {user?.bio && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{user.bio}</p>
              </div>
            )}

            {/* Public Portfolio Link */}
            {user?.email && (
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700">Public Portfolio</label>
                <p className="mt-1 text-sm text-indigo-600 break-all">
                  {`${window.location.origin}/portfolio/publicportfolio/${user.email.split('@')[0]}`}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}