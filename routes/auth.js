const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const router = express.Router();

const authenticateUser = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    password: new PasswordComplexity({
      min: 8,
      max: 50,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 4,
    }),
  });

  return schema.validate(req);
};

router.post("/", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) return res.status(400).send("Invalid email or password");

      authenticateUser(req.body.password, user.password).then((isValid) => {
        if (!isValid) return res.status(400).send("Invalid email or password");

        res.send(user.generateAuthToken());
      });
    })
    .catch((err) => {
      logServerErrorAndRespond(err, "Authentication error", res);
    });
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
