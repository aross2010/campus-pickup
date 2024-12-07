import { Event, User } from '@prisma/client'
import path from 'path'
import ejs from 'ejs'
import { sendEmail } from './send-email'

export const sendEventConfirmation = async (event: Event, user: User) => {
  const subject = `You're confirmed for ${event.title}!`
  const templatePath = path.join(
    __dirname,
    '../templates/event-confirmation.ejs'
  )
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
