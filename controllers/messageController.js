const db = require("../database/queries");

exports.addMessage = async (req, res) => {
  const { message } = req.body;
  await db.addMessage(message, req.params.id);
  res.redirect("/");
};

exports.deleteMessage = async (req, res) => {
  await db.deleteMessage(req.params.id);
  req.redirect("/");
};
