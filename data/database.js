import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const clusterAddress = process.env.MONGODB_CLUSTER_ADDRESS;
const dbUser = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbName = process.env.MONGODB_DB_NAME || "test";

// Construir URI de conexión para entorno de GitHub Actions
const uri = `mongodb://${dbUser}:${dbPassword}@${clusterAddress}:27017/${dbName}?authSource=admin`;
console.log("uri", uri);
const client = new MongoClient(uri);

console.log("Trying to connect to db");

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log("Connected db to server");
} catch (error) {
  console.log("Connection failed.");
  await client.close();
  console.log("Connection closed.");
}

const database = client.db(dbName);

export default database;

//lowkickdev
//wrSwjWGSn42LfpTg
