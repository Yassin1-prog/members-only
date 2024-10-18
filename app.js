const express = require("express");
const path = require("node:path");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash"); // to be able to display error message incase of failed login
const session = require("cookie-session"); // cookie-session is more suitable for production as it stores on the client
//const session = require("express-session"); // and not on the server
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./database/queries");
const signupController = require("./controllers/signupController");
const messageController = require("./controllers/messageController");
const privelageController = require("./controllers/privelegeController");

const app = express();
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use(flash());
app.use((req, res, next) => {
  res.locals.alert = req.flash();
  next();
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUser(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserbyId(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// home route
app.get("/", async (req, res) => {
  const messages = await db.getMessages();
  res.render("index", { messages: messages, user: req.user });
});

// signup route
app.get("/signup", async (req, res) => {
  res.render("signup");
});

app.post("/signup", signupController.createUser);

// login route

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// message route
app.post("/create-message", messageController.addMessage);

app.post("/delete-message/:id", messageController.deleteMessage);

// join-club route
app.get("/join-club", async (req, res) => {
  res.render("joinclub");
});

app.post("/join-club", privelageController.newMember);

// become-admin route
app.get("/become-admin", async (req, res) => {
  res.render("beadmin");
});

app.post("/become-admin", privelageController.newAdmin);

const PORT = 3000;
app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}!`));
