const db = require("../database/queries");

exports.newMember = async (req, res) => {
  const { passcode } = req.body;
  if (passcode == "one") {
    await db.becomeMember(req.params.id);
    console.log(req.user);
    res.redirect("/");
  } else {
    res.render("joinclub", { wrong: "The passcode you entered is incorrect" });
  }
};

exports.newAdmin = async (req, res) => {
  const { passcode } = req.body;
  if (passcode == "resu") {
    await db.becomeAdmin(req.params.id);
    res.redirect("/");
  } else {
    res.render("beadmin", { wrong: "The passcode you entered is incorrect" });
  }
};
