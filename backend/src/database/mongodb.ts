import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable');
}

declare global {
  // eslint-disable-next-line no-var
  var mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri);
const clientPromise = global.mongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== 'production') {
  global.mongoClientPromise = clientPromise;
}

export default clientPromise;
