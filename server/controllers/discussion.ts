import { Request, Response } from 'express'
import { UserToken } from '../libs/types'
import client from '../libs/prisma'

export const createComment = async (req: Request, res: Response, next: any) => {
  const { discussionId } = req.params
  const { text } = req.body

  try {
    const user = req.user as UserToken
    const userId = user.id

    const discussion = await client.discussion.findUnique({
      where: {
        id: discussionId,
      },
    })

    if (!discussion) {
      res.status(404).json({ error: 'Discussion not found.' })
    }

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: 'Comment text is required.' })
    }

    const comment = await client.comment.create({
      data: {
        text,
        userId,
        discussionId,
      },
    })

    res.status(201).json(comment)
  } catch (error) {
    next(error)
  }
}

export const createReply = async (req: Request, res: Response, next: any) => {
  const { commentId } = req.params
  const { text } = req.body

  try {
    const user = req.user as UserToken
    const userId = user.id

    if (!text || text.trim().length === 0) {
      res.status(400).json({ error: 'Reply text is required.' })
    }

    const comment = await client.comment.findUnique({
      where: {
        id: commentId,
      },
    })

    if (!comment) {
      res.status(404).json({ error: 'Comment not found.' })
    }

    const reply = await client.comment.create({
      data: {
        text,
        userId,
        discussionId: comment.discussionId,
        parentCommentId: comment.id,
      },
    })

    res.status(201).json(reply)
  } catch (error) {
    next(error)
  }
}

export const deleteComment = async (req: Request, res: Response, next: any) => {
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
      res.status(404).json({ error: 'Comment not found.' })
    }

    if (comment.userId !== userId) {
      res.status(403).json({ error: 'You are not the author of this comment.' })
    }

    await client.comment.delete({
      where: {
        id,
      },
    })

    res.json({ message: 'Comment successfully deleted.' })
  } catch (error) {
    next(error)
  }
}
