const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  dateOfBirth: String,
  password: String,
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(_.pick(this, ["_id", "isAdmin"]), "jwtSecretKey");
};

function getUsersModel() {
  return mongoose.model("Users", userSchema);
}

const User = getUsersModel();

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    dateOfBirth: Joi.string(),
    password: new PasswordComplexity({
      min: 8,
      max: 50,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 4,
    }),
  });

  return schema.validate(user);
}

module.exports = {
  User: User,
  validate: validateUser,
};
