const error = require("../middleware/error");
const cors = require("cors");
const homeRouter = require("../routes/home");
const usersRouter = require("../routes/users");
const authRouter = require("../routes/auth");

const express = require("express");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/", homeRouter);
  app.use("/api/v1/users", usersRouter);
  app.use("/login", authRouter);
  app.use(error);
};
