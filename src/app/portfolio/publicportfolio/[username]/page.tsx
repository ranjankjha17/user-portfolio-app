import { notFound } from 'next/navigation';
import User from '@/models/User';
import Portfolio from '@/models/Portfolio';
import dbConnect from '@/lib/dbConnect';
import ContactForm from '@/components/ContactForm';

export default async function PublicPortfolioPage({
  params,
}: {
  params: { username: string };
}) {
  await dbConnect();

  // Find user by username (using email prefix for simplicity)
  const emailPrefix = params.username.replace('-', '@');
  const user = await User.findOne({
    email: { $regex: `^${emailPrefix}` },
  }).select('-password');

  if (!user) {
    return notFound();
  }

  // Get user's portfolio items
  const portfolioItems = await Portfolio.find({ user: user._id }).sort({
    createdAt: -1,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {user.profileImage && (
            <img
              src={user.profileImage}
              alt={user.name}
              className="mx-auto h-32 w-32 rounded-full object-cover mb-4"
            />
          )}
          <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
          {user.jobTitle && (
            <p className="text-xl text-gray-600 mt-2">{user.jobTitle}</p>
          )}
          {user.bio && (
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">{user.bio}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {portfolioItems.map((item: any) => (
            <div
              key={item._id.toString()}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {item.projectName}
                </h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {item.demoUrl && (
                    <a
                      href={item.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  
                  {item.repositoryUrl && (
                    <a
                      href={item.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Me</h2>
          <ContactForm email={user.email} />
        </div>
      </div>
    </div>
  );
}