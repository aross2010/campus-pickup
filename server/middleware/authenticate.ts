import passport from 'passport'
import { Request, Response } from 'express'
import client from '../libs/prisma'
import { User } from '@prisma/client'

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: any
) => {
  try {
    passport.authenticate(
      'jwt',
      { session: false },
      async (err: any, user: any, info: any) => {
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized Access' })
        }
        if (err) {
          next(err)
        }
        const userInDb = (await client.user.findUnique({
          where: {
            id: user.id,
          },
        })) as User
        if (!userInDb.emailVerified) {
          return res.status(401).json({ error: 'Must validate student email.' })
        }
        req.user = user
        next()
      }
    )(req, res, next)
  } catch (error) {
    next(error)
  }
}
