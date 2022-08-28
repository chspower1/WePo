const nodemailer = require("nodemailer")

class mailService {

  static async sendEmail({ from, to, subject, text, html }) {
    /* Input parameter example
      {
        from: '"Fred Foo 👻" <wnsdml0120@gmail.com>', // sender address
        to: "wnsdml0120@gmail.com", // list of receivers: "*@*.*, *@*.*"
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      }
    */

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAILS_EMAIL, // Google ID
        pass: process.env.MAILS_PWD, // Google App Password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({ from, to, subject, text, html });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }

}
export { mailService }