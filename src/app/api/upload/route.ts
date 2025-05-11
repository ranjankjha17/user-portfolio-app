// import { NextResponse } from 'next/server';
// import { writeFile } from 'fs/promises';
// import path from 'path';
// import { getCurrentUser } from '@/lib/auth';
// import User from '@/models/User';
// import dbConnect from '@/lib/dbConnect';

// export async function POST(request: Request) {
//   await dbConnect();
//   const user = await getCurrentUser();

//   if (!user) {
//     return NextResponse.json(
//       { success: false, message: 'Not authenticated' },
//       { status: 401 }
//     );
//   }

//   try {
//     const data = await request.formData();
//     const file: File | null = data.get('file') as unknown as File;

//     if (!file) {
//       return NextResponse.json(
//         { success: false, message: 'No file provided' },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Save to public/uploads
//     const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
//     const filename = `${Date.now()}-${file.name}`;
//     const filePath = path.join(uploadsDir, filename);
    
//     await writeFile(filePath, buffer);

//     // Update user profile image
//     const imageUrl = `/uploads/${filename}`;
//     await User.findByIdAndUpdate(user._id, { profileImage: imageUrl });

//     return NextResponse.json(
//       { 
//         success: true, 
//         imageUrl 
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




// Update app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { getCurrentUser } from '@/lib/auth';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';

export async function POST(request: Request) {
  await dbConnect();
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error('Error creating uploads directory:', err);
    }

    // Save file
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadsDir, filename);
    
    await writeFile(filePath, buffer);

    // Update user profile image
    const imageUrl = `/uploads/${filename}`;
    await User.findByIdAndUpdate(user._id, { profileImage: imageUrl });

    return NextResponse.json(
      { 
        success: true, 
        imageUrl 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}