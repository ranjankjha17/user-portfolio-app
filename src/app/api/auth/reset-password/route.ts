import { NextResponse } from 'next/server';
import User from '@/models/User';
import Token from '@/models/Token';
import dbConnect from '@/lib/dbConnect';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await dbConnect();
  const { token, newPassword } = await request.json();

  const tokenDoc = await Token.findOne({ 
    token,
    expiresAt: { $gt: new Date() } 
  });

  if (!tokenDoc) {
    return NextResponse.json(
      { success: false, message: 'Invalid or expired token' },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.findByIdAndUpdate(tokenDoc.userId, { 
    password: hashedPassword 
  });

  await Token.deleteOne({ _id: tokenDoc._id });

  return NextResponse.json(
    { success: true, message: 'Password updated successfully' },
    { status: 200 }
  );
}