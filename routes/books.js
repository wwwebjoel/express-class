const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const { Book, validate } = require("../models/book");

const getBooks = async () => {
  return await Book.find().sort("title");
};

const createBook = async (book) => {
  return await new Book(book).save();
};

router.get("/", async (req, res) => {
  getBooks()
    .then((books) => res.status(200).send(books))
    .catch((err) =>
      logServerErrorAndRespond(err, "Could not get all books", res)
    );
});

router.post("/", [auth], (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  Book.findOne({ title: req.body.title }).then((book) => {
    if (book)
      return res.status(400).send("This book already exists in our database.");
  });
  createBook(req.body).then((book) => {
    res.send(book);
  });
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Deleted" }))
    .catch((e) => res.send({ message: "Error" }));
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
