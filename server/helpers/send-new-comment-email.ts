import { Comment, Event, User } from '@prisma/client'
import path from 'path'
import ejs from 'ejs'
import { sendEmail } from './send-email'

export const sendNewCommentEmail = async (
  host: User,
  comment: Comment,
  event: Event
) => {
  const subject = `New comment on ${event.title}`
  const templatePath = path.join(__dirname, '../templates/new-comment.ejs')
  const htmlContent = await ejs.renderFile(templatePath, {
    host,
    comment,
    event,
  })
  const res = await sendEmail(host.email, subject, htmlContent)
  if (res) {
    console.log('Email sent successfully.')
  } else {
    console.log('Email failed to send')
  }
}
