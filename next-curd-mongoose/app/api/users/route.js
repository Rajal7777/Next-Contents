import { connectDB } from "@/lib/mongoose";

export async function GET() {
  await connectDB();

  console.log("Api call and db connected");

  return Response.json({
    message: "connetion successfull",
  });
}
