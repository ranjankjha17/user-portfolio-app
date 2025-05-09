import { NextResponse } from 'next/server';
import Portfolio from '@/models/Portfolio';
import dbConnect from '@/lib/dbConnect';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { projectName, description, demoUrl, repositoryUrl, tags } = await request.json();

    const portfolioItem = new Portfolio({
      projectName,
      description,
      demoUrl,
      repositoryUrl,
      tags,
      user: user._id
    });

    await portfolioItem.save();

    return NextResponse.json(
      { success: true, data: portfolioItem },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const portfolioItems = await Portfolio.find({ user: user._id }).sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, data: portfolioItems },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}