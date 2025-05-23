import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileImage?: string;
  jobTitle?: string;
  bio?: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { 
    type: String, 
    required: false,
    default: '',
    validate: {
      validator: function(v: string) {
        if (!v) return true;
        return /^(https?:\/\/[^\s]+)|(\/[^\s]*)$/.test(v);
      },
      message: (props: any) => `${props.value} is not a valid image URL or path!`
    }
  },
  jobTitle: { type: String, required: false, default: '' },
  bio: { type: String, required: false, default: '', maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);