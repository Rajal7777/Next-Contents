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
  console.log('ID',id)
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

 
  const { id, ...updatedFields } = body;

  if (!id) {
    return NextResponse.json({ message: "ID required" }, { status: 400 });
  }

  const result = await db.collection("users").updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: updatedFields,
    },
  );

  return NextResponse.json({
    message: "User updated using PATCH api",
    data: result,
  });
}

//DELETE
export async function DELETE(req){
try {
    const db = await connectDB();
  const body = await req.json();

  const { id } = body;

  const result = await db.collection('users').deleteOne({
    _id : new ObjectId(id)
  })

  if(result.deletedCount === 0){
    return NextResponse.json({
      message:'User Not Found'
    })
  }

  return NextResponse.json({
    message: 'user deleted Successfully!'
  })
  
} catch (error) {
   return NextResponse.json({
    message: 'Error deleting user',
    error: error.message
   })
}
}
