import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

export async function connectDB() {
  const clientConection = client.connect();
 //mongodb stores data in collections
  const db = (await clientConection).db("nextjs-mongodb");

  return db;
}
