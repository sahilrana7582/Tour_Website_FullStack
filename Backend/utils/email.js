const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.HOST,
    port: process.env.PORT_EMAIL,
    secure: false,
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>',
    to: options.email,
    subject: options.subject,
    text: `<b>${options.message}</b>`,
    html: `<footer>Sahil</footer>`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
