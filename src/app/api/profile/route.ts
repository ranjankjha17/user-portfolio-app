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

// export async function PUT(request: Request) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const { name, jobTitle, bio,profileImage } = await request.json();
//     console.log( name, jobTitle, bio,profileImage)

//     const updatedUser = await User.findByIdAndUpdate(
//       user._id,
//       { name, jobTitle, bio,profileImage },
//       { new: true }
//     );

//     return NextResponse.json(
//       { 
//         success: true, 
//         user: {
//           name: updatedUser?.name,
//           email: updatedUser?.email,
//           profileImage: updatedUser?.profileImage,
//           jobTitle: updatedUser?.jobTitle,
//           bio: updatedUser?.bio
//         } 
//       },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }


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

    // Extract all fields from request body
    const { name, jobTitle, bio, profileImage } = await request.json();
    console.log('Updating user with:', { name, jobTitle, bio, profileImage });

    // Create update object
    const updateData = {
      name,
      // Only update these fields if they're not undefined
      ...(jobTitle !== undefined && { jobTitle }),
      ...(bio !== undefined && { bio }),
      // Convert undefined to null for profileImage
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