import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping(); // ✅ Checks the connection
    return NextResponse.json({ message: "MongoDB connected successfully" });
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "MongoDB connection failed", error: error.message },
      { status: 500 } // ✅ App Router uses this way to set status code
    );
  }
}
