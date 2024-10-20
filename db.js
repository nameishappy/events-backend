import mysql from "mysql2/promise";

let pool;

export const connectToDb = async () => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    // If the pool hasn't been created, create it
    if (!pool) {
      pool = mysql.createPool({
        uri: process.env.DATABASE_URL,
        waitForConnections: true,
        connectionLimit: 10, // Adjust based on your needs
        queueLimit: 0,
        connectTimeout: 10000, // Optional: add a connection timeout
      });
      console.log("Connected to MySQL via pool");
    }

    return pool; // Return the pool instead of a single connection
  } catch (err) {
    console.error("Database connection error:", err);
    throw err;
  }
};
