import { User, Event } from '@prisma/client'
import path from 'path'
import ejs from 'ejs'
import { sendEmail } from './send-email'

export const sendOffWaitingEmail = async (event: Event, user: User) => {
  const subject = `You've been taken off the waiting list for ${event.title}!`
  const templatePath = path.join(__dirname, '../templates/off-waiting-list.ejs')
  const htmlContent = await ejs.renderFile(templatePath, {
    user,
    event,
  })
  const res = await sendEmail(user.email, subject, htmlContent)
  if (res) {
    console.log('Email sent successfully.')
  } else {
    console.log('Email failed to send')
  }
}
