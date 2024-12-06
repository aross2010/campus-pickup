import express from 'express'
import e, { Request, Response } from 'express'
import client from './libs/prisma'
import { initializePassport } from './passport-config'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import cors from 'cors'
import { isvalidEmail } from './helpers/valid-email'
import { equal } from 'assert'
import { v2 as cloudinary } from 'cloudinary'
import { schoolYears, skillLevels, sports } from './libs/data'
import { UserToken } from './libs/types'


const app = express()
const PORT = 3000

initializePassport()
app.use(passport.initialize())
app.use(express.json())
app.use(cors()); 

const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '30d' })
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hellooo')
})

/* Return every school */
app.get('/schools', async (req: Request, res: Response) => {
  const schools = await client.school.findMany()
  res.json(schools)
})

/* Return data associated with a specific school */
app.get('/school/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const school = await client.school.findUnique({
    where: {
      id,
    },
  })
  if (!school) {
    res.status(404).json({ error: 'School not found' })
  }
  res.json(school)
})

/* Return ALL data associated with a specific user: user info, school, 
events joined, hosted, and waiting, and comments  */
app.get('/user/:id', async (req: Request, res: Response) => {
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
})

/* Return every event */
app.get('/events', async (req: Request, res: Response) => {
  const events = await client.event.findMany()
  res.json(events)
})

/* Get an event by id */
app.get('/event/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  const event = await client.event.findUnique({
    where: {
      id,
    },
    include: {
      discussion: true,
    },
  })
  if (!event) {
    res.status(404).json({ error: 'Event not found' })
  }
  res.json(event)
})

/* Get all events by a specific sport */
app.get('/events/sport/:sport', async (req: Request, res: Response) => {
  const { sport } = req.params
  const events = await client.event.findMany({
    where: {
      sport,
    },
  })
  res.json(events)
})

/* Get all events by a specific school */
app.get('/events/school/:school', async (req: Request, res: Response) => {
  const { school } = req.params
  const events = await client.event.findMany({
    where: {
      school,
    },
  })
  res.json(events)
})

// Register user
app.post('/register', async (req: Request, res: Response, next: any) => {
  const { email, password, firstName, lastName } = req.body

  try {
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' })
    }

    if (password.length < 8) {
      res
        .status(400)
        .json({ error: 'Password must be at least 8 characters long.' })
    }

    if (!firstName && !lastName) {
      res.status(400).json({ error: 'First name and last name are required.' })
    }

    const userExists = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
      res
        .status(400)
        .json({ error: 'Account with email address already exists.' })
    }

    const emailDomain = email.split('@')[1]

    if (!emailDomain) {
      res.status(400).json({ error: 'Invalid email address.' })
    }

    const schoolId = await client.school.findFirst({
      where: {
        emailDomain: emailDomain,
      },
      select: {
        id: true,
      },
    })

    if (!schoolId) {
      res.status(400).json({ error: 'Invalid university email.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        schoolId: schoolId.id,
      },
    })

    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
})

// Login user
app.post('/login', async (req: Request, res: Response, next: any) => {
  const { email, password } = req.body

  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      res.status(401).json({ error: 'Invalid email or password.' })
    }

    const token = generateToken({ id: user.id, email: user.email })
    res.json({ token })
  } catch (error) {
    next(error)
  }
})

// Update user
app.put(
  '/user/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
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
)

// Create new event
app.post(
  '/event',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const {
      title,
      description,
      date,
      sport,
      skillLevel,
      location,
      coed,
      maxPlayers,
    } = req.body

    const user = req.user as UserToken
    const hostId = user.id

    if (
      !title ||
      !description ||
      !date ||
      !sport ||
      !skillLevel ||
      !location ||
      !hostId ||
      coed === undefined
    ) {
      res.status(400).json({ error: 'Missing required fields.' })
    }

    if (title.length < 4 || title.length > 50) {
      res
        .status(400)
        .json({ error: 'Title must be between 4 and 50 characters.' })
    }

    if (description.length < 10 || description.length > 500) {
      res
        .status(400)
        .json({ error: 'Description must be between 10 and 500 characters.' })
    }

    // verify date contains a time
    if (!date.includes('T')) {
      res.status(400).json({ error: 'Invalid date format.' })
    }

    // verify date is in the future
    if (new Date(date) < new Date()) {
      res.status(400).json({ error: 'Date must be in the future.' })
    }

    if (!sports.includes(sport)) {
      res.status(400).json({ error: 'Invalid sport.' })
    }

    if (!skillLevels.includes(skillLevel)) {
      res.status(400).json({ error: 'Invalid skill level.' })
    }

    if (typeof coed !== 'boolean') {
      res.status(400).json({ error: 'Invalid coed setting.' })
    }

    if (typeof maxPlayers !== 'number' || maxPlayers < 2 || maxPlayers > 50) {
      res.status(400).json({ error: 'Invalid max players.' })
    }

    if (location.length < 2 || location.length > 50) {
      res
        .status(400)
        .json({ error: 'Location must be between 2 and 50 characters.' })
    }

    const hostUser = await client.user.findUnique({
      where: {
        id: hostId,
      },
    })

    if (!hostUser) {
      res.status(400).json({ error: 'Invalid host.' })
    }

    try {
      const event = await client.event.create({
        data: {
          title,
          description,
          date,
          sport,
          skillLevel,
          location,
          coed,
          hostId,
          maxPlayers,
          schoolId: hostUser.schoolId,
          discussion: {
            create: {},
          },
        },
      })

      res.status(201).json(event)
    } catch (error) {
      next(error)
    }
  }
)

// Delete event
app.delete(
  '/event/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params

    try {
      const user = req.user as UserToken

      const eventToDelete = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (eventToDelete.hostId !== user.id) {
        res.status(403).json({ error: 'You are not the host of this event.' })
      }

      await client.event.delete({
        where: {
          id,
        },
      })
      // send email to all users who joined the event that it was cancelled
      res.json({ message: 'Event successfully deleted.' })
    } catch (error) {
      next(error)
    }
  }
)

// Update event
app.put(
  '/event/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params
    const {
      title,
      description,
      date,
      sport,
      skillLevel,
      location,
      coed,
      maxPlayers,
    } = req.body

    try {
      const user = req.user as UserToken

      const eventToUpdate = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (eventToUpdate.hostId !== user.id) {
        res.status(403).json({ error: 'You are not the host of this event.' })
      }

      const data: any = {}

      if (title) {
        if (title.length < 4 || title.length > 50) {
          res
            .status(400)
            .json({ error: 'Title must be between 4 and 50 characters.' })
        }
        data['title'] = title
      }

      if (description) {
        if (description.length < 10 || description.length > 500) {
          res.status(400).json({
            error: 'Description must be between 10 and 500 characters.',
          })
        }
        data['description'] = description
      }

      if (date) {
        // Ensure date contains a time
        if (!date.includes('T')) {
          res.status(400).json({ error: 'Invalid date format.' })
        }

        // Ensure date is in the future
        if (new Date(date) < new Date()) {
          res.status(400).json({ error: 'Date must be in the future.' })
        }

        data['date'] = date
      }

      if (sport) {
        if (!sports.includes(sport)) {
          res.status(400).json({ error: 'Invalid sport.' })
        }
        data['sport'] = sport
      }

      if (skillLevel) {
        if (!skillLevels.includes(skillLevel)) {
          res.status(400).json({ error: 'Invalid skill level.' })
        }
        data['skillLevel'] = skillLevel
      }

      if (location) {
        if (location.length < 2 || location.length > 50) {
          res
            .status(400)
            .json({ error: 'Location must be between 2 and 50 characters.' })
        }
        data['location'] = location
      }

      if (coed !== undefined) {
        if (typeof coed !== 'boolean') {
          res.status(400).json({ error: 'Invalid coed setting.' })
        }
        data['coed'] = coed
      }

      if (maxPlayers !== undefined) {
        if (
          typeof maxPlayers !== 'number' ||
          maxPlayers < 2 ||
          maxPlayers > 50
        ) {
          res.status(400).json({
            error: 'Max players must be a number between 2 and 50.',
          })
        }
        data['maxPlayers'] = maxPlayers
      }

      const event = await client.event.update({
        where: { id },
        data: data,
      })

      res.json(event)
    } catch (error) {
      next(error)
    }
  }
)

// Create new comment
app.post(
  '/discussion/discussionId/comment',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
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
)

// Reply to comment
app.post(
  '/comments/:commentId/reply',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
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
)

// Delete comment
app.delete(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
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
        res
          .status(403)
          .json({ error: 'You are not the author of this comment.' })
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
)

// Add user to event
app.put(
  '/event/:id/join',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params

    try {
      const user = req.user as UserToken
      const userId = user.id

      const event = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (!event) {
        res.status(404).json({ error: 'Event not found.' })
      }

      if (event.usersJoinedIds.includes(userId)) {
        res.status(400).json({ error: 'You have already joined this event.' })
      }

      if (event.usersJoinedIds.length >= event.maxPlayers) {
        res.status(400).json({ error: 'Event is full.' })
      }

      const updatedEvent = await client.event.update({
        where: {
          id,
        },
        data: {
          usersJoinedIds: {
            push: userId,
          },
        },
      })
      res
        .status(201)
        .json({ message: 'Successfully joined event.', updatedEvent })
    } catch (error) {
      next(error)
    }
  }
)

// Add user to waitlist
app.put(
  '/event/:id/joinWaiting',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params

    try {
      const user = req.user as UserToken
      const userId = user.id

      const event = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (!event) {
        res.status(404).json({ error: 'Event not found.' })
      }

      if (event.usersJoinedIds.includes(userId)) {
        res.status(400).json({ error: 'You have already joined this event.' })
      }

      if (event.usersWaitingIds.includes(userId)) {
        res.status(400).json({ error: 'You are already on the waiting list.' })
      }

      const updatedEvent = await client.event.update({
        where: {
          id,
        },
        data: {
          usersWaitingIds: {
            push: userId,
          },
        },
      })

      res
        .status(201)
        .json({ message: 'Successfully joined waiting list.', updatedEvent })
    } catch (error) {
      next(error)
    }
  }
)

// Remove user from event
app.delete(
  '/event/:id/leave',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params

    try {
      const user = req.user as UserToken
      const userId = user.id

      const event = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (!event) {
        res.status(404).json({ error: 'Event not found.' })
      }

      if (!event.usersJoinedIds.includes(userId)) {
        res.status(400).json({ error: 'You have not joined this event.' })
      }

      const updatedEvent = await client.event.update({
        where: {
          id,
        },
        data: {
          usersJoinedIds: {
            set: event.usersJoinedIds.filter((id: string) => id !== userId),
          },
        },
      })

      res
        .status(201)
        .json({ message: 'Successfully left event.', updatedEvent })
    } catch (error) {
      next(error)
    }
  }
)

// Remove user from waitlist
app.delete(
  '/event/:id/leaveWaiting',
  passport.authenticate('jwt', { session: false }),
  async (req: Request, res: Response, next: any) => {
    const { id } = req.params

    try {
      const user = req.user as UserToken
      const userId = user.id

      const event = await client.event.findUnique({
        where: {
          id,
        },
      })

      if (!event) {
        res.status(404).json({ error: 'Event not found.' })
      }

      if (!event.usersWaitingIds.includes(userId)) {
        res.status(400).json({ error: 'You are not on the waiting list.' })
      }

      const updatedEvent = await client.event.update({
        where: {
          id,
        },
        data: {
          usersWaitingIds: {
            set: event.usersWaitingIds.filter((id: string) => id !== userId),
          },
        },
      })

      res
        .status(201)
        .json({ message: 'Successfully left waiting list.', updatedEvent })
    } catch (error) {
      next(error)
    }
  }
)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

// universal catch-all error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).json({ error: err.message })
})

// nodemon app.ts
