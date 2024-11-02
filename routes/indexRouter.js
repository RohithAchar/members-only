const express = require("express");
const {
  registerPostController,
  loginGetController,
  messageGetController,
  messagePostController,
  membershipGetController,
  membershipPostController,
} = require("../controller/controller");
const { validateUser } = require("../lib/extra");
const passport = require("passport");
const isAuthenticated = require("../lib/authMiddleware");

const indexRouter = express();

indexRouter.get("/", loginGetController);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/messages",
    failureRedirect: "/?invalid=true",
  })
);

indexRouter.get("/register", (req, res) => {
  res.render("register");
});
indexRouter.post("/register", validateUser, registerPostController);

indexRouter.get("/messages", isAuthenticated, messageGetController);
indexRouter.post("/message", isAuthenticated, messagePostController);

indexRouter.get("/membership", isAuthenticated, membershipGetController);
indexRouter.post("/membership", isAuthenticated, membershipPostController);

module.exports = indexRouter;
