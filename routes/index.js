const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user");
const Recipe = require("../models/recipe");

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "Recipe Sharing" });
});

/* GET signup page. */
router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign Up" });
});

/* POST signup submission. */
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.register(new User({ email, password: hashedPassword }), password);

    res.redirect("/login");
  } catch (err) {
    console.error(err);

    res.render("signup", { title: "Sign Up", errorMessage: "Registration failed, please try again." });
  }
});

/* GET login page. */
router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

/* POST login submission. */
router.post("/login", passport.authenticate("local", {
  successReturnToOrRedirect: "/recipes",
  failureMessage: true,
  keepSessionInfo: true,
}));

/* GET logout submission. */
router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) return next(err);

    res.redirect("/");
  });
});

module.exports = router;
