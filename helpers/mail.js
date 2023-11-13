// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     host: "smtp.office365.com",
//     port: 587,
//     secure: false, // upgrade later with STARTTLS
//     auth: {
//       user: "omar.villadiegoc@campusucc.edu.co",
//       pass: "_+_+gTA;J4Yyh6K",
//     },
//   });

//   module.exports = transporter


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'villadiegoomar476@gmail.com', // Tu dirección de correo de Gmail
    pass: 'ekvm jfns ecot dkmm', // La contraseña de aplicación generada
  },
  secure: true,
  port: 465,
});

module.exports = transporter;



  // ekvm jfns ecot dkmm