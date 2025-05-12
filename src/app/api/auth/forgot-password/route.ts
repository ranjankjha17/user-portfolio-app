// app/api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server';
import User from '@/models/User';
import Token from '@/models/Token';
import dbConnect from '@/lib/dbConnect';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request: Request) {
  await dbConnect();
  const { email } = await request.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { success: false, message: 'If this email exists, a reset link will be sent' },
      { status: 200 }
    );
  }

  // Generate token
  const token = crypto.randomBytes(32).toString('hex');
  
  // Save token to DB
  await Token.create({
    token,
    userId: user._id
  });

  // Send email
  await sendPasswordResetEmail(user.email, token);

  return NextResponse.json(
    { success: true, message: 'Password reset link sent to email' },
    { status: 200 }
  );
}