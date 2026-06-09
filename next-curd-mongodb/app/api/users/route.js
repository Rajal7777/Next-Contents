import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

//put method
export async function PUT(req) {
  const db = await connectDB();
  const body = await req.json();

  const { id, name, role } = body;

  if (!id) {
    return NextResponse.json({ message: "Error ID required" }, { status: 401 });
  }

  const result = await db.collection("users").updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        role,
      },
    },
  );

  return NextResponse.json({
    message: "User updated using put api",
    data: result,
  });
}

//patch method
export async function PATCH(req) {
  const db = await connectDB();

  const body = await req.json();

  console.log("BODY:", body);

  const { id, ...updatedFields } = body;

  console.log("ID:", id);

  if (!id) {
    return NextResponse.json(
      { message: "ID required" },
      { status: 400 }
    );
  }

  const result = await db.collection("users").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: updatedFields,
    }
  );

  return NextResponse.json({
    message: "User updated using PATCH api",
    data: result,
  });
}

