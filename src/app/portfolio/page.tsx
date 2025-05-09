import ProtectedRoute  from '@/components/ProtectedRoute';
import PortfolioList from '@/components/PortfolioList';

export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioList />
        </div>
      </div>
    </ProtectedRoute>
  );
}