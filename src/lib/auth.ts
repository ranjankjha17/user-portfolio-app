import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import User, { IUser } from '@/models/User';
import dbConnect from '@/lib/dbConnect';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const COOKIE_NAME = 'auth-token';

export async function generateToken(userId: string): Promise<string> {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUser(): Promise<IUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return null;

  const userId = await verifyToken(token);
  if (!userId) return null;

  await dbConnect();
  const user = await User.findById(userId).select('-password');
  
  return user;
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400, // 1 day
    path: '/',
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
}