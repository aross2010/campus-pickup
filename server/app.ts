import express from 'express'
import { Request, Response } from 'express'
import { initializePassport } from './passport-config'
import passport from 'passport'
import { authenticateUser } from './middleware/authenticate'
import { loginUser, registerUser, verifyEmail } from './controllers/auth'
import {
  addUserToPlayersJoined,
  addUserToPlayersWaiting,
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsBySchool,
  getEventsBySport,
  removeUserFromPlayersJoined,
  removeUserFromPlayersWaiting,
  updateEvent,
} from './controllers/events'
import { getUserById, updateUserById } from './controllers/user'
import { getAllSchools, getSchoolById } from './controllers/schools'
import {
  createComment,
  createReply,
  deleteComment,
} from './controllers/discussion'
import cors from 'cors'



const app = express()
const PORT = 3000

initializePassport()
app.use(passport.initialize())
app.use(express.json())
app.use(cors()); 

/* Authentication routes */

app.post('/register', registerUser)
app.post('/login', loginUser)
app.post('/verifyEmail/user/:id', verifyEmail)

/* Event Routes */

app.get('/events', getAllEvents)
app.get('/event/:id', getEventById)
app.get('/events/sport/:sport', getEventsBySport)
app.get('/events/school/:school', getEventsBySchool)
app.post('/event', authenticateUser, createEvent)
app.delete('/event/:id', authenticateUser, deleteEvent)
app.put('/event/:id', authenticateUser, updateEvent)
app.put('/event/:id/join', authenticateUser, addUserToPlayersJoined)
app.put('/event/:id/joinWaiting', authenticateUser, addUserToPlayersWaiting)
app.delete('/event/:id/leave', authenticateUser, removeUserFromPlayersJoined)
app.delete(
  '/event/:id/leaveWaiting',
  authenticateUser,
  removeUserFromPlayersWaiting
)

/* User Routes */

app.get('/user/:id', getUserById)
app.put('/user/:id', authenticateUser, updateUserById)

/* School Routes */

app.get('/schools', getAllSchools)
app.get('/school/:id', getSchoolById)

/* Discussion Routes */

app.post('/discussion/discussionId/comment', authenticateUser, createComment)
app.post('/comments/:commentId/reply', authenticateUser, createReply)
app.delete('/comment/:id', authenticateUser, deleteComment)

app.listen(PORT, () => {
  console.log('Server is running on port 3000')
})

// Error Handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  res.status(500).json({ error: err.message })
})
