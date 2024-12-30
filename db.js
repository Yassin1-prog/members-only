const { Pool } = require("pg");
require("dotenv").config();

/*
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL // use Railway's DATABASE_URL in production
    : process.env.LOCAL_DATABASE_URL; // use local DB for development
*/

const connectionString = "postgresql://yassin:hamza@localhost:5432/members";

module.exports = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false, // Add SSL
  },
});
