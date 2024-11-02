const express = require("express");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const localStrategy = require("./config/passport-auth");
const indexRouter = require("./routes/indexRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  session({
    secret: "skittle-chan",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(localStrategy));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
