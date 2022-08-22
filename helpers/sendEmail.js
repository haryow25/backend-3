const nodemailer = require('nodemailer');

exports.sendEmail = (emailData) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Email has been sent`))
    .catch((err) => console.log(`Opps! Something wrong: ${err}`));
};
