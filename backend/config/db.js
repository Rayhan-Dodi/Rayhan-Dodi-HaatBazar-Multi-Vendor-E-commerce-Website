// Import required modules
const sql = require("mssql"); // For MSSQL
const mongoose = require("mongoose"); // For MongoDB
const redis = require("redis"); // For Redis

// Configuration for MSSQL
const mssqlConfig = {
  user: "your_mssql_username",
  password: "your_mssql_password",
  server: "your_mssql_server", // e.g., localhost or IP address
  database: "your_mssql_database",
  options: {
    encrypt: true, // Required for Azure
    enableArithAbort: true, // Helps avoid connection issues
  },
};

// Configuration for MongoDB
const mongoURI = "mongodb://localhost:27017/your_mongodb_database"; // Replace with your MongoDB URI

// Configuration for Redis
const redisConfig = {
  host: "127.0.0.1", // Redis server host
  port: 6379, // Redis default port
};

// Initialize MSSQL connection
const connectMSSQL = async () => {
  try {
    const pool = await sql.connect(mssqlConfig);
    console.log("Connected to MSSQL successfully!");
    return pool; // Return the connection pool
  } catch (err) {
    console.error("MSSQL connection error:", err);
    throw err;
  }
};

// Initialize MongoDB connection
const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

// Initialize Redis connection
const connectRedis = async () => {
  const client = redis.createClient(redisConfig);
  client.on("connect", () => console.log("Connected to Redis successfully!"));
  client.on("error", (err) => console.error("Redis connection error:", err));
  await client.connect(); // Redis v4+ requires async connect
  return client;
};

// Initialize all database connections
const initDatabases = async () => {
  try {
    // Connect to MSSQL
    const mssqlPool = await connectMSSQL();

    // Connect to MongoDB
    await connectMongoDB();

    // Connect to Redis
    const redisClient = await connectRedis();

    // Return all connections for further use
    return { mssqlPool, redisClient };
  } catch (err) {
    console.error("Error initializing databases:", err);
    process.exit(1); // Exit the application if any connection fails
  }
};

// Export connections for use in other parts of the app
module.exports = initDatabases;
