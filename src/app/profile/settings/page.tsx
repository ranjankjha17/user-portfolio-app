// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from '@/context/AuthProvider';
// import ProtectedRoute from '@/components/ProtectedRoute';

// export default function ProfileSettingsPage() {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({
//     name: '',
//     jobTitle: '',
//     bio: '',
//     profileImage: null as string | null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         jobTitle: user.jobTitle || '',
//         bio: user.bio || '',
//         profileImage: user.profileImage || null,
//       });
//     }
//   }, [user]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess(false);

//     try {
//       const response = await fetch('/api/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           profileImage: formData.profileImage || null,
//         }),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Failed to update profile');
//       }

//       // Show success message instead of reloading
//       setSuccess(true);
//       setTimeout(() => setSuccess(false), 3000);
      
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files || e.target.files.length === 0) return;

//     setLoading(true);
//     setError('');
//     setSuccess(false);

//     try {
//       const formData = new FormData();
//       formData.append('file', e.target.files[0]);

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Failed to upload image');
//       }

//       const { imageUrl } = await response.json();
//       setFormData(prev => ({
//         ...prev,
//         profileImage: imageUrl,
//       }));
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <ProtectedRoute>
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
//         )}
        
//         {success && (
//           <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
//             Profile updated successfully!
//           </div>
//         )}

//         <div className="bg-white p-6 rounded-lg shadow-sm">
//           <div className="flex flex-col items-center mb-6">
//             <div className="relative">
//               <img
//                 src={formData.profileImage || '/default-avatar.png'}
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//               />
//               <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                   disabled={loading}
//                 />
//                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
//                 </svg>
//               </label>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* ... rest of your form fields remain the same ... */}
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
//                 Job Title
//               </label>
//               <input
//                 type="text"
//                 id="jobTitle"
//                 name="jobTitle"
//                 value={formData.jobTitle}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div>
//               <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
//                 Bio
//               </label>
//               <textarea
//                 id="bio"
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 rows={4}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               />
//             </div>

//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//               >
//                 {loading ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthProvider';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ProfileSettingsPage() {
  const { user } = useAuth();
  // console.log("user",user)
  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    bio: '',
    profileImage: null as string | null,
  });
  const [loading, setLoading] = useState(true); // Start with loading true
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        jobTitle: user.jobTitle || '',
        bio: user.bio || '',
        profileImage: user.profileImage || null,
      });
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          profileImage: formData.profileImage || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to upload image');
      }

      const { imageUrl } = await response.json();
      setFormData(prev => ({
        ...prev,
        profileImage: imageUrl,
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  if (loading && !user) {
    return (
      <ProtectedRoute>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p>Loading profile data...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}
        
        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            Profile updated successfully!
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <img
                src={formData.profileImage || '/default-avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={loading}
                />
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </label>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}