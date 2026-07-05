const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT), // ✅ required
      secure: Number(process.env.MAIL_PORT) === 465, // ✅ true for 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })

    const info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    })

    console.log("Mail sent:", info.messageId)
    return info
  } catch (error) {
    console.error("mailSender error:", error) // ✅ full error log
    throw error // ✅ IMPORTANT: do not swallow error
  }
}

module.exports = mailSender
