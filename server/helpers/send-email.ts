import { transporter } from '../libs/mail'

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
