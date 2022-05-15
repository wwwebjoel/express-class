const mailService = require("../services/email");

function mail(req, res, next) {
  mailService()
    .then(() => {
      console.log("Mail sent");
      next();
    })
    .catch((e) => {
      console.log("Mail not sent");
      next();
    });
}

module.exports = mail;
