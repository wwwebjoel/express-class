const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers["x-authentication-token"];

  if (!token) return res.status(401).send("No token provided.");

  try {
    const verifiedUser = jwt.verify(token, "jwtSecretKey");
    req.user = verifiedUser;
    next();
  } catch (e) {
    res.status(400).send("Token is not valid.");
  }
}

module.exports = auth;
