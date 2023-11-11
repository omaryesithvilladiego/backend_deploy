const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "omar.villadiegoc@campusucc.edu.co",
      pass: "_+_+gTA;J4Yyh6K",
    },
  });

  module.exports = transporter