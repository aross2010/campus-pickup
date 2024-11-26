import express, { Request, Response } from 'express'
import client from './libs/prisma'

const app = express()

const PORT = 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hellooo')
})

/* Return every school */
app.get('/schools', async (req: Request, res: Response) => {
  try {
    const schools = await client.school.findMany()
    res.json(schools)
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Return data associated with a specific school */
app.get('/school/:id', async (req: Request, res: Response) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Return ALL data associated with a specific user: user info, school, 
events joined, hosted, and waiting, and comments  */
app.get('/user/:id', async (req: Request, res: Response) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Return every event */
app.get('/events', async (req: Request, res: Response) => {
  try {
    const events = await client.event.findMany()
    res.json(events)
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Get an event by id */
app.get('/event/:id', async (req: Request, res: Response) => {
  try {
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
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Get all events by a specific sport */
app.get('/events/sport/:sport', async (req: Request, res: Response) => {
  try {
    const { sport } = req.params
    const events = await client.event.findMany({
      where: {
        sport,
      },
    })
    res.json(events)
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

/* Get all events by a specific school */
app.get('/events/school/:school', async (req: Request, res: Response) => {
  try {
    const { school } = req.params
    const events = await client.event.findMany({
      where: {
        school,
      },
    })
    res.json(events)
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
  }
})

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

// nodemon app.ts
