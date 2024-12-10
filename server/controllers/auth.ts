import { Request, Response } from 'express'
import client from '../libs/prisma'
import bcrypt from 'bcryptjs'
import { generateToken } from '../helpers/generate-token'
import { sendWelcomeEmail } from '../helpers/send-welcome-email'
import { School, User } from '@prisma/client'

export const registerUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { email, password, firstName, lastName } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' })
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long.' })
    }

    if (!firstName && !lastName) {
      return res
        .status(400)
        .json({ error: 'First name and last name are required.' })
    }

    const userExists = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'Account with email address already exists.' })
    }

    const emailDomain = email.split('@')[1]

    if (!emailDomain) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const school = (await client.school.findFirst({
      where: {
        emailDomain: emailDomain,
      },
    })) as School

    if (!school.id) {
      return res.status(400).json({ error: 'Invalid university email.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        schoolId: school.id,
      },
    })

    await client.school.update({
      where: {
        id: school.id,
      },
      data: {
        numUsers: {
          increment: 1,
        },
      },
    })

    const token = generateToken({ id: user.id, email: user.email })

    res.status(201).json({ user, token })

    await sendWelcomeEmail(firstName, user.id, school, email)
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { email, password } = req.body

  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    const token = generateToken({ id: user.id, email: user.email })
    return res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params
  const user = (await client.user.update({
    where: {
      id,
    },
    data: {
      emailVerified: true,
    },
  })) as User

  if (user.emailVerified) {
    return res.status(400).json({
      message: 'Email already verified.',
    })
  }

  return res.status(200).json({
    message: 'Email verified.',
    user,
  })
}
