import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import User from "@/models/Users";

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const body = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }, // "new: true" replaces "returnDocument"
    );
    console.log("updated user", updatedUser);

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User Updated Successfully",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error in updating!",
        error: error.message,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "Deleted user",
      data: deleteUser
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting",
      error: error.message,
    });
  }
}
