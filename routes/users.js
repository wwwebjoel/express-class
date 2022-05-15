const express = require("express");
const main = require("../services/email");
const router = express.Router();
const auth = require("../middleware/auth");
const mail = require("../middleware/mail");
const admin = require("../middleware/admin");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");

const getUsers = async () => {
  return await User.find()
    .select(["_id", "name", "email", "dateOfBirth"])
    .sort("name");
};

const createUser = async (user) => {
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  return await new User(user).save();
};

router.get("/", [auth, mail, admin], async (req, res) => {
  getUsers()
    .then((User) => res.status(200).send(User))
    .catch((err) =>
      logServerErrorAndRespond(err, "Could not get all users", res)
    );
});

router.get("/me", async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(_.pick(user, ["_id", "name", "email", "dateOfBirth"]));
});

router.post("/", (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).send("Please use another email.");
  });
  createUser(req.body).then((newUser) =>
    res.send(_.pick(newUser, ["_id", "name", "email", "dateOfBirth"]))
  );
});

const logServerErrorAndRespond = (
  err,
  friendlyMessage,
  res,
  statusCode = 500
) => {
  console.log(friendlyMessage, err);
  res.status(statusCode).send(`${friendlyMessage}: ${err.message}`);
};

module.exports = router;
