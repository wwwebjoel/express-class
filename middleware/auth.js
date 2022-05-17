const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["x-authentication-token"];

  if (!token)
    return res.status(401).send("Please log in to perform this task.");

  try {
    const verifiedUser = jwt.verify(token, "jwtSecretKey");
    req.user = verifiedUser;
    next();
  } catch (e) {
    res.status(400).send("Please log in again with valid credentials.");
  }
}

module.exports = auth;
