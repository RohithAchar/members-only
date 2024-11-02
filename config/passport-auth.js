const passport = require("passport");
const { getUser, getUserById } = require("../db/query");
const bcrypt = require("bcryptjs");

const localStrategy = async (username, password, done) => {
  const user = await getUser(username);
  if (!user) {
    return done(null, false, { message: "Incorrect username" });
  }
  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (!isAuthenticated) {
    return done(null, false, { message: "Incorrect password" });
  }
  return done(null, user);
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  const user = await getUserById(id);
  done(null, user);
});

module.exports = localStrategy;
