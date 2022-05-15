const mongoose = require("mongoose");
const config = require("rc")("www");

const connectToDatabase = () => {
  mongoose.connect(config.db).then(() => console.log("Database connected."));
};

module.exports = connectToDatabase;
