import { Request, Response } from 'express'
import { UserToken } from '../libs/types'
import client from '../libs/prisma'
import { Comment, Discussion, Event } from '@prisma/client'
import { sendNewCommentEmail } from '../helpers/send-new-comment-email'
import { sendNewReplyEmail } from '../helpers/send-new-reply-email'

export const createComment = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { discussionId } = req.params
  const { text } = req.body

  try {
    const user = req.user as UserToken
    const userId = user.id

    const discussion = (await client.discussion.findUnique({
      where: {
        id: discussionId,
      },
    })) as Discussion

    const event = (await client.event.findUnique({
      where: {
        discussion: {
          id: discussion.id,
        },
      },
    })) as Event

    if (!discussion) {
      return res.status(404).json({ error: 'Discussion not found.' })
    }

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Comment text is required.' })
    }

    if (!event.usersJoinedIds.includes(userId)) {
      return res
        .status(403)
        .json({ error: 'You must join the event to comment.' })
    }

    const comment = await client.comment.create({
      data: {
        text,
        userId,
        discussionId,
      },
    })

    res.status(201).json({
      message: 'Comment successfully created.',
      comment,
    })

    if (event.hostId === userId) {
      return // do not send email to host if host is the one commenting
    }

    const host = await client.user.findUnique({
      where: {
        id: event.hostId,
      },
    })

    await sendNewCommentEmail(host, comment, event)
  } catch (error) {
    next(error)
  }
}

export const createReply = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { commentId } = req.params
  const { text } = req.body

  try {
    const user = req.user as UserToken
    const userId = user.id

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: 'Reply text is required.' })
    }

    const comment = await client.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    const discussion = (await client.discussion.findUnique({
      where: {
        comments: {
          some: {
            id: commentId,
          },
        },
      },
    })) as Discussion

    const event = (await client.event.findUnique({
      where: {
        discussion: {
          id: discussion.id,
        },
      },
    })) as Event

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' })
    }

    if (!event.usersJoinedIds.includes(userId)) {
      return res
        .status(403)
        .json({ error: 'You must join the event to reply.' })
    }

    const reply = (await client.comment.create({
      data: {
        text,
        userId,
        discussionId: comment.discussionId,
        parentCommentId: comment.id,
      },
    })) as Comment
    res.status(201).json(reply)

    const replyUser = await client.user.findUnique({
      where: {
        id: reply.userId,
      },
    })

    const commentUser = await client.user.findUnique({
      where: {
        id: comment.userId,
      },
    })

    await sendNewReplyEmail(commentUser, comment, replyUser, event, reply)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { id } = req.params

  try {
    const user = req.user as UserToken
    const userId = user.id

    const comment = await client.comment.findUnique({
      where: {
        id,
      },
    })

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found.' })
    }

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ error: 'You are not the author of this comment.' })
    }

    await client.comment.delete({
      where: {
        id,
      },
    })

    return res.json({ message: 'Comment successfully deleted.' })
  } catch (error) {
    next(error)
  }
}
