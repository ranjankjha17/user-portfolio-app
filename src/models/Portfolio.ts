// import mongoose, { Document, Schema } from 'mongoose';
// import { IUser } from './User';

// export interface IPortfolio extends Document {
//   title: string;
//   description: string;
//   imageUrl: string;
//   tags: string[];
//   user: IUser['_id'];
//   createdAt: Date;
//   updatedAt: Date;
// }

// const PortfolioSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   imageUrl: { type: String, required: true },
//   tags: { type: [String], default: [] },
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// }, {
//   timestamps: true
// });

// export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);



import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IPortfolio extends Document {
  projectName: string;
  description: string;
  demoUrl: string;
  repositoryUrl: string;
  tags: string[];
  user: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  demoUrl: { type: String },
  repositoryUrl: { type: String },
  tags: { type: [String], default: [] },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.models.Portfolio || mongoose.model<IPortfolio>('Portfolio', PortfolioSchema);