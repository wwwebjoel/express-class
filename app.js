const express = require("express");
const config = require("rc")("www");

require("./startup/database")();
const port = process.env.PORT || config.port;
const app = express();

require("./startup/routes")(app);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
