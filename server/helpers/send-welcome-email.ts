import { School } from '@prisma/client'
import path from 'path'
import ejs from 'ejs'
import { sendEmail } from './send-email'

export const sendWelcomeEmail = async (
  firstName: string,
  userId: string,
  school: School,
  emailAddress: string
) => {
  const subject = `Welcome to Campus Pickup at ${school.name}!`
  const templatePath = path.join(__dirname, '../templates/welcome.ejs')
  const htmlContent = await ejs.renderFile(templatePath, {
    firstName,
    school: school,
    verifyUrl: `http://localhost:3000/verifyEmail/user/${userId}`,
  })
  const res = await sendEmail(emailAddress, subject, htmlContent)
  if (res) {
    console.log('Email sent successfully.')
  } else {
    console.log('Email failed to send')
  }
}
