// import { NextResponse } from 'next/server';
// import Portfolio from '@/models/Portfolio';
// import dbConnect from '@/lib/dbConnect';
// import { getCurrentUser } from '@/lib/auth';

// export async function GET(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const portfolioItem = await Portfolio.findOne({
//       _id: params.id,
//       user: user._id
//     });

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: portfolioItem },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }
//     const { projectName, description, demoUrl, repositoryUrl, tags } = await request.json();
//     const portfolioItem = await Portfolio.findOneAndUpdate(
//       { _id: params.id, user: user._id },
//       {
//       projectName,
//       description,
//       demoUrl,
//       repositoryUrl,
//       tags,
//       user: user._id
//     },
//       { new: true }
//     );

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: portfolioItem },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const portfolioItem = await Portfolio.findOneAndDelete({
//       _id: params.id,
//       user: user._id
//     });

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: {} },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }



// import { NextResponse } from 'next/server';
// import Portfolio from '@/models/Portfolio';
// import dbConnect from '@/lib/dbConnect';
// import { getCurrentUser } from '@/lib/auth';

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const portfolioItem = await Portfolio.findOne({
//       _id: params.id,
//       user: user._id
//     });

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: portfolioItem },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();
//     const portfolioItem = await Portfolio.findOneAndUpdate(
//       { _id: params.id, user: user._id },
//       { ...body, user: user._id },
//       { new: true }
//     );

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: portfolioItem },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect();
//     const user = await getCurrentUser();

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: 'Not authenticated' },
//         { status: 401 }
//       );
//     }

//     const portfolioItem = await Portfolio.findOneAndDelete({
//       _id: params.id,
//       user: user._id
//     });

//     if (!portfolioItem) {
//       return NextResponse.json(
//         { success: false, message: 'Portfolio item not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: {} },
//       { status: 200 }
//     );
//   } catch (error: unknown) {
//     const message = error instanceof Error ? error.message : 'Unknown error';
//     return NextResponse.json(
//       { success: false, message },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from 'next/server';
import Portfolio from '@/models/Portfolio';
import dbConnect from '@/lib/dbConnect';
import { getCurrentUser } from '@/lib/auth';

type RouteParams = {
  params: {
    id: string;
  };
};

export async function GET(
  request: Request,
  context: RouteParams
): Promise<NextResponse> {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const portfolioItem = await Portfolio.findOne({
      _id: context.params.id,
      user: user._id
    });

    if (!portfolioItem) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: portfolioItem },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

// Similar updates for PUT and DELETE handlers
export async function PUT(
  request: Request,
  context: RouteParams
): Promise<NextResponse> {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const portfolioItem = await Portfolio.findOneAndUpdate(
      { _id: context.params.id, user: user._id },
      { ...body, user: user._id },
      { new: true }
    );

    if (!portfolioItem) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: portfolioItem },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteParams
): Promise<NextResponse> {
  try {
    await dbConnect();
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const portfolioItem = await Portfolio.findOneAndDelete({
      _id: context.params.id,
      user: user._id
    });

    if (!portfolioItem) {
      return NextResponse.json(
        { success: false, message: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: {} },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}