import { Request, Response } from 'express'
import client from '../libs/prisma'
import { UserToken } from '../libs/types'
import { sports, schoolYears } from '../libs/data'
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcryptjs'

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await client.user.findUnique({
    where: {
      id,
    },
    include: {
      school: true,
      eventsHosted: true,
      eventsJoined: true,
      eventsWaiting: true,
      comments: true,
    },
  })
  if (!user) {
    res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
}

export const updateUserById = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { id } = req.params
  const {
    firstName,
    lastName,
    bio,
    major,
    favoriteSports,
    schoolYear,
    profileImage,
    coverImage,
    newPassword,
    eventConfirmationNotification,
    discussionReplyNotification,
  } = req.body

  const data: any = {}

  try {
    const user = req.user as UserToken

    if (id !== user.id) {
      res
        .status(403)
        .json({ error: 'You are not authorized to edit this user.' })
    }

    if (firstName) data['firstName'] = firstName
    if (lastName) data['lastName'] = lastName
    if (bio) data['bio'] = bio
    if (major) data['major'] = major
    if (favoriteSports) data['favoriteSports'] = favoriteSports
    if (schoolYear) data['schoolYear'] = schoolYear
    if (profileImage) data['profileImage'] = profileImage
    if (coverImage) data['coverImage'] = coverImage
    if (newPassword) data['newPassword'] = newPassword
    if (eventConfirmationNotification !== undefined)
      data['eventConfirmationNotification'] = eventConfirmationNotification
    if (discussionReplyNotification !== undefined)
      data['discussionReplyNotification'] = discussionReplyNotification

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    if (profileImage) {
      const uploadResponse = await cloudinary.uploader.upload(profileImage, {
        folder: 'campus-pickup',
      })

      if (!uploadResponse || !uploadResponse.secure_url) {
        res.status(400).json({ error: 'Error uploading profile image.' })
      }

      data['profileImage'] = uploadResponse.secure_url
    }

    if (coverImage) {
      const uploadResponse = await cloudinary.uploader.upload(coverImage, {
        folder: 'campus-pickup',
      })

      if (!uploadResponse || !uploadResponse.secure_url) {
        res.status(400).json({ error: 'Error uploading cover image.' })
      }

      data['coverImage'] = uploadResponse.secure_url
    }

    if (newPassword) {
      if (newPassword.length < 8) {
        res
          .status(400)
          .json({ error: 'Password must be at least 8 characters long.' })
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      data['password'] = hashedPassword
    }

    if (favoriteSports) {
      favoriteSports.forEach((sport: any) => {
        if (!sports.includes(sport)) {
          res.status(400).json({ error: 'Invalid sport.' })
        }
      })
    }

    if (schoolYear) {
      if (!schoolYears.includes(schoolYear)) {
        res.status(400).json({ error: 'Invalid school year.' })
      }
    }

    if (eventConfirmationNotification) {
      if (typeof eventConfirmationNotification !== 'boolean') {
        res.status(400).json({ error: 'Invalid notification setting.' })
      }
    }

    if (discussionReplyNotification) {
      if (typeof discussionReplyNotification !== 'boolean') {
        res.status(400).json({ error: 'Invalid notification setting.' })
      }
    }

    const updatedUser = await client.user.update({
      where: {
        id,
      },
      data: data,
    })

    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
}
