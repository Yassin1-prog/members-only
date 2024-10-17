const express = require("express");
const app = express();
const path = require("node:path");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index", { messages: [] });
});

app.get("/signup", async (req, res) => {
  res.render("signup");
});

app.get("/login", async (req, res) => {
  res.render("login");
});

app.get("/join-club", async (req, res) => {
  res.render("joinclub");
});

app.get("/become-admin", async (req, res) => {
  res.render("beadmin");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));
