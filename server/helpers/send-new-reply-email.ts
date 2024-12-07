import { Comment, Event, User } from '@prisma/client'
import path from 'path'
import ejs from 'ejs'
import { sendEmail } from './send-email'

export const sendNewReplyEmail = async (
  parentCommentUser: User,
  parentComment: Comment,
  replyUser: User,
  event: Event,
  reply: Comment
) => {
  const subject = `New reply on ${event.title}`
  const templatePath = path.join(__dirname, '../templates/new-reply.ejs')
  const htmlContent = await ejs.renderFile(templatePath, {
    parentCommentUser,
    parentComment,
    replyUser,
    event,
    reply,
  })
  const res = await sendEmail(parentCommentUser.email, subject, htmlContent)
  if (res) {
    console.log('Email sent successfully.')
  } else {
    console.log('Email failed to send')
  }
}
