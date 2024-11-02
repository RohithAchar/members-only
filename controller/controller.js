const bcrypt = require("bcryptjs");
const { SALT } = require("../lib/extra");
const {
  registerUser,
  createMessage,
  getMessages,
  updateMembership,
} = require("../db/query");
const { validationResult, body } = require("express-validator");

async function registerPostController(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).render("register", { errors: errors.array() });
      return;
    }
    const { firstname, lastname, username, password } = req.body;
    const hash = await bcrypt.hash(password, SALT);
    await registerUser(firstname, lastname, username, hash, false);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ msg: "Internal error" });
    console.log("[POST /register", error);
  }
}

async function loginGetController(req, res) {
  const { invalid } = req.query;
  res.render("login", { invalid });
}

async function messageGetController(req, res) {
  const messages = await getMessages();

  return res.render("message", {
    userid: req.user.id,
    messages: messages,
    membership: req.user.membership,
  });
}

async function messagePostController(req, res) {
  try {
    await createMessage(req.body.id, req.body.message);
    res.redirect("/messages");
  } catch (error) {
    console.log("[POST]/message: ", error);
    res.redirect("/messages");
  }
}

async function membershipGetController(req, res) {
  res.render("membership", { isWrong: false, hints: null });
}

async function membershipPostController(req, res) {
  const ANSWER = "shadow";
  const hints = [
    "I only appear when there’s light nearby.",
    "I follow people around, but I’m not alive.",
  ];
  const answer = req.body.answer.toLowerCase().trim();
  if (ANSWER !== answer) {
    return res.render("membership", { isWrong: true, hints: hints });
  }
  await updateMembership(req.user.id);
  return res.redirect("/messages");
}

module.exports = {
  registerPostController,
  loginGetController,
  messageGetController,
  messagePostController,
  membershipGetController,
  membershipPostController,
};
