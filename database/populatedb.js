const { Client } = require("pg");

const SQL = `
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    ismember BOOLEAN DEFAULT FALSE,
    isadmin BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages (
    messageid SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2],
    ssl: {
      rejectUnauthorized: false, // Add SSL
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
