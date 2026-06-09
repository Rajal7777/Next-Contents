import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

//get method
export async function GET() {
  const db = await connectDB();

  const users = await db.collection("users").find({}).toArray();

  return NextResponse.json({
    users,
  });
}

//post method
export async function POST(req) {
  const db = await connectDB();

  //get data from users
  const body = await req.json();
  //insert data in DB
  const userData = await db.collection("users").insertOne(body);

  return NextResponse.json({
    message: "Successful",
    data: userData,
  });
}
