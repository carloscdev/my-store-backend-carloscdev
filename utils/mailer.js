const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD
  }
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve('./views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName: ".hbs",
}

transporter.use('compile', hbs(handlebarOptions));

transporter.verify().then(() => {
  console.log('Mailer is ready to send email');
});

async function sendMail({to, subject, template, context}) {
  return await transporter.sendMail({
    from: process.env.MAILER_USER,
    to,
    subject,
    template,
    context
  });
}

module.exports = {sendMail};
