import Portfolio from '@/models/Portfolio';
import dbConnect from './dbConnect';
import { getCurrentUser } from './auth';

export async function getPortfolioItem(id: string) {
  await dbConnect();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Not authenticated');
  }

  const portfolioItem = await Portfolio.findOne({
    _id: id,
    user: user._id,
  });

  if (!portfolioItem) {
    throw new Error('Portfolio item not found');
  }

  return {
    _id: portfolioItem._id.toString(),
    projectName: portfolioItem.projectName,
    description: portfolioItem.description,
    demoUrl: portfolioItem.demoUrl,
    repositoryUrl: portfolioItem.repositoryUrl,
    tags: portfolioItem.tags,
  };
}