import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  //Demo credentials
  if (email === "admin@test.com" && password === "admin123") {
    const token = generateToken({ email });

    return NextResponse.json({
      message: "Login sucessful",
      token,
    });
  }
  //invalid credentials
  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
