const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

function getBooksModel() {
  return mongoose.model("Books", bookSchema);
}

const Book = getBooksModel();

function validateBook(book) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    author: Joi.string(),
    price: Joi.number().integer().required(),
  });

  return schema.validate(book);
}

module.exports = {
  Book: Book,
  validate: validateBook,
};
