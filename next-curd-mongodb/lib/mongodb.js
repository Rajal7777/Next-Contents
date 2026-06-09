import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

//no uri
if(!process.env.MONGODB_URI){
    throw new Error('Please provide your MongoDB URI');
}

//create a new MongoDB client instace with the connection string.
client = new MongoClient(uri);
clientPromise = client.connect();


export default clientPromise;