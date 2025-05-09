// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// interface PortfolioFormProps {
//   initialData?: {
//     _id?: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     tags: string[];
//   };
// }

// export default function PortfolioForm({ initialData }: PortfolioFormProps) {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     imageUrl: '',
//     tags: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         title: initialData.title,
//         description: initialData.description,
//         imageUrl: initialData.imageUrl,
//         tags: initialData.tags.join(', '),
//       });
//     }
//   }, [initialData]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const tagsArray = formData.tags
//         .split(',')
//         .map(tag => tag.trim())
//         .filter(tag => tag.length > 0);

//       const portfolioData = {
//         title: formData.title,
//         description: formData.description,
//         imageUrl: formData.imageUrl,
//         tags: tagsArray,
//       };

//       const url = initialData?._id 
//         ? `/api/portfolio/${initialData._id}`
//         : '/api/portfolio';
//       const method = initialData?._id ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(portfolioData),
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         throw new Error(data.message || 'Failed to save portfolio item');
//       }

//       router.push('/portfolio');
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
//     <div className="max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">
//         {initialData?._id ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
//       </h2>
      
//       {error && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//             rows={4}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
//             Image URL
//           </label>
//           <input
//             type="url"
//             id="imageUrl"
//             name="imageUrl"
//             value={formData.imageUrl}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div>
//           <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
//             Tags (comma separated)
//           </label>
//           <input
//             type="text"
//             id="tags"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>

//         <div className="flex justify-end space-x-4">
//           <button
//             type="button"
//             onClick={() => router.push('/portfolio')}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//           >
//             {loading ? 'Saving...' : 'Save'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface PortfolioFormProps {
  initialData?: {
    _id?: string;
    projectName: string;
    description: string;
    demoUrl: string;
    repositoryUrl: string;
    tags: string[];
  };
}

export default function PortfolioForm({ initialData }: PortfolioFormProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    demoUrl: '',
    repositoryUrl: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (initialData) {
      setFormData({
        projectName: initialData.projectName,
        description: initialData.description,
        demoUrl: initialData.demoUrl || '',
        repositoryUrl: initialData.repositoryUrl || '',
        tags: initialData.tags.join(', '),
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const portfolioData = {
        projectName: formData.projectName,
        description: formData.description,
        demoUrl: formData.demoUrl,
        repositoryUrl: formData.repositoryUrl,
        tags: tagsArray,
      };

      const url = initialData?._id 
        ? `/api/portfolio/${initialData._id}`
        : '/api/portfolio';
      const method = initialData?._id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to save portfolio item');
      }

      router.push('/portfolio');
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

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {initialData?._id ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}
      </h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
            Project Name*
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700">
            Demo URL
          </label>
          <input
            type="url"
            id="demoUrl"
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            placeholder="https://example.com"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="repositoryUrl" className="block text-sm font-medium text-gray-700">
            Repository URL
          </label>
          <input
            type="url"
            id="repositoryUrl"
            name="repositoryUrl"
            value={formData.repositoryUrl}
            onChange={handleChange}
            placeholder="https://github.com/username/repo"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Next.js, Tailwind"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/portfolio')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}