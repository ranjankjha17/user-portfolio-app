import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { generateToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already in use' },
        { status: 400 }
      );
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = await generateToken(user._id.toString());

    const response = NextResponse.json(
      { success: true, user: { id: user._id, name: user.name, email: user.email } },
      { status: 201 }
    );

    setAuthCookie(token);

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}