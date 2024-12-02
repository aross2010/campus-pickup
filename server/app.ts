import express from 'express'
import e, { Request, Response } from 'express'
import client from './libs/prisma'
import { initializePassport } from './passport-config'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { isvalidEmail } from './helpers/valid-email'
import { equal } from 'assert'

const app = express()
const PORT = 3000

initializePassport()
app.use(passport.initialize())
app.use(express.json())

const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '30d' })
}

app.post('/register', async (req: Request, res: Response) => {
  const { email, password, firstName, LastName, profileImage } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required.' })
  }

  const schoolId = await client.school.findFirst({
    where: {
      emailDomain: email.split('@')[1],
    },
  })
  if (!schoolId) {
    res.status(400).json({ error: 'Invalid university email.' })
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

  const hashedPassword = await bcrypt.hash(password, 10)
})

// app.post('/register', async (req: Request, res: Response) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(400).json({ error: 'Email and password are required.' })
//   }

//   if (!isvalidEmail(email)) {
//     return res.status(400).json({ error: 'Invalid university email.' })
//   }

//   const user = await client.user.create({
//     data: {
//       email,
//       password,
//     },
//   })
//   const token = generateToken({ id: user.id, email: user.email })
//   res.json({ token })
// })

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

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

// universal catch-all error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err)
  res.status(500).json({ error: 'Something went wrong.' })
})

// nodemon app.ts
