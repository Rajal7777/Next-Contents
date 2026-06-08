import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(request: Request) {
    //Authorization: Bearer eyJhbGciOiJIUzI1Ni... -> authheader = "Bearer eyJhbGciOiJIUzI1Ni..."
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
 
  //authHeader ="Bearer abc123xyz" // split(" ") creates: ["Bearer", "abc123xyz"]
  //["Bearer", "abc123xyz"]
  const token = authHeader.split(" ")[1];

  try {
    const user = verifyToken(token);

    return NextResponse.json({
      message: "Protected data",
      user,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
