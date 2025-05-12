// models/Token.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  token: string;
  userId: mongoose.Schema.Types.ObjectId;
  expiresAt: Date;
}

const TokenSchema = new Schema({
  token: { type: String, required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true,
    default: () => new Date(Date.now() + 3600000) // 1 hour expiry
  }
});

export default mongoose.models.Token || mongoose.model<IToken>('Token', TokenSchema);