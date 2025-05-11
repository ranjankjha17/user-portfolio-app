import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { getCurrentUser } from '@/lib/auth';

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

    return NextResponse.json(
      { 
        success: true, 
        user: {
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          jobTitle: user.jobTitle,
          bio: user.bio
        } 
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



export async function PUT(request: Request) {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { name, email,jobTitle, bio, profileImage } = await request.json();
    console.log('Updating user with:', { name,email, jobTitle, bio, profileImage });

    const updateData = {
      name, email,
      ...(jobTitle !== undefined && { jobTitle }),
      ...(bio !== undefined && { bio }),
      profileImage: profileImage !== undefined ? profileImage : null
    };

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          profileImage: updatedUser.profileImage,
          jobTitle: updatedUser.jobTitle,
          bio: updatedUser.bio
        } 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}