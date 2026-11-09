
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "spmb_citra_negara";

if (!uri) {
  throw new Error("MONGODB_URI belum diatur di .env.local");
}

const client = new MongoClient(uri);

let dbPromise;

export async function connectDB() {
  if (!dbPromise) {
    dbPromise = client.connect()
      .then((connectedClient) => connectedClient.db(dbName))
      .catch((error) => {
        dbPromise = null;
        throw error;
      });
  }

  return dbPromise;
}
