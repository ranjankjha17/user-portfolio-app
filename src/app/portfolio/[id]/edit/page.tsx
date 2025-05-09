import  ProtectedRoute  from '@/components/ProtectedRoute';
import PortfolioForm from '@/components/PortfolioForm';
import { getPortfolioItem } from '@/lib/portfolio';

export default async function EditPortfolioPage({
  params,
}: {
  params: { id: string };
}) {
  const portfolioItem = await getPortfolioItem(params.id);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioForm initialData={portfolioItem} />
        </div>
      </div>
    </ProtectedRoute>
  );
}