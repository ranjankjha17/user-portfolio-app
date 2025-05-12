import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().admin().ping();
    return NextResponse.json({ message: "MongoDB connected successfully" });
  } catch (error: any) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "MongoDB connection failed", error: error.message },
      { status: 500 }
    );
  }
}
