import mongoose, { Document } from 'mongoose';
import { IUser } from './user.model';

interface IPortfolioItem extends Document {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  user: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new mongoose.Schema<IPortfolioItem>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    tags: { type: [String], default: [] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PortfolioItem ||
  mongoose.model<IPortfolioItem>('PortfolioItem', portfolioSchema);