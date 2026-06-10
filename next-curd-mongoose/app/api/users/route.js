import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/Users";

//Test DB
/*
export async function GET() {
  await connectDB();

  console.log("Api call and db connected");

  return Response.json({
    message: "connetion successfully",
  });
}    
  */

//POSt
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await User.create(body);

    return NextResponse.json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating User",
      error: error.message,
    });
  }
}
