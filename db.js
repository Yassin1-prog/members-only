const { Pool } = require("pg");

const connectionString = "postgresql://yassin:hamza@localhost:5432/members";

module.exports = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
