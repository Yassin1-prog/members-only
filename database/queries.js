const pool = require("../db");

async function getUser(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function getUserbyId(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

async function addUser({ firstname, lastname, username, hashedpassword }) {
  await pool.query(
    "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)",
    [firstname, lastname, username, hashedpassword]
  );
}

async function becomeMember(id) {
  await pool.query("UPDATE users SET ismember = $1", [true]);
}

async function becomeAdmin(id) {
  await pool.query("UPDATE users SET isadmin = $1", [true]);
}

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages m INNER JOIN users u ON m.user_id = u.id"
  );
  return rows;
}

async function addMessage(message, user_id) {
  await pool.query("INSERT INTO messages (message, user_id) VALUES ($1, $2)", [
    message,
    user_id,
  ]);
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE messageid = $1", [id]);
}

module.exports = {
  getUser,
  getUserbyId,
  addUser,
  becomeMember,
  becomeAdmin,
  getMessages,
  addMessage,
  deleteMessage,
};
