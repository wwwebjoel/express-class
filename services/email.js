"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
module.exports = async function () {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "joel.triodash@gmail.com", // generated ethereal user
      pass: "PMp5HnYd3OAvzsgw", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"JP 👻" <joel.triodash@gmail.com>', // sender address
    to: "joel.triodash@gmail.com", // list of receivers
    subject: "SendInBlue test message", // Subject line
    text: "This is test email using SendInBlue", // plain text body
    html: `<b>${"This is test email using SendInBlue"}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

//SendInBlue API

// ------------------
// Create a campaign\
// ------------------
// // Include the Sendinblue library\
// var SibApiV3Sdk = require("sib-api-v3-sdk");
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// // Instantiate the client\
// var apiKey = defaultClient.authentications["api-key"];
// apiKey.apiKey = "YOUR_API_V3_KEY";
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// // Define the campaign settings\
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = { name: "From name", email: "joel.triodash@gmail.com" };
// emailCampaigns.type = "classic";
// // Content that will be sent\
// (emailCampaigns.htmlContent =
//   "Congratulations! You successfully sent this example campaign via the Sendinblue API."),
//   // Select the recipients\
//   (emailCampaigns.recipients = { listIds: [2, 7] }),
//   // Make the call to the client\
//   apiInstance.createEmailCampaign(emailCampaigns).then(
//     function (data) {
//       console.log("API called successfully. Returned data: " + data);
//     },
//     function (error) {
//       console.error(error);
//     }
//   );
