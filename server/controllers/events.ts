import { Request, Response } from 'express'
import client from '../libs/prisma'
import { sports, skillLevels } from '../libs/data'
import { UserToken } from '../libs/types'
import { Event } from '@prisma/client'
import { sendOffWaitingEmail } from '../helpers/send-off-waiting-email'
import { sendEventConfirmation } from '../helpers/send-event-confirmation'

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<any> => {
  const events = await client.event.findMany()
  return res.json(events)
}

export const getEventsBySport = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { sport } = req.params
  const events = await client.event.findMany({
    where: {
      sport,
    },
  })
  return res.json(events)
}

export const getEventById = async (
  req: Request,
  res: Response
): Promise<any> => {
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
    return res.status(404).json({ error: 'Event not found' })
  }
  res.json(event)
}

export const getEventsBySchool = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { school } = req.params
  const events = await client.event.findMany({
    where: {
      school,
    },
  })
  return res.json(events)
}

export const createEvent = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
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
    return res
      .status(400)
      .json({ error: 'Title must be between 4 and 50 characters.' })
  }

  if (description.length < 10 || description.length > 500) {
    return res
      .status(400)
      .json({ error: 'Description must be between 10 and 500 characters.' })
  }

  // verify date contains a time
  if (!date.includes('T')) {
    return res.status(400).json({ error: 'Invalid date format.' })
  }

  // verify date is in the future
  if (new Date(date) < new Date()) {
    return res.status(400).json({ error: 'Date must be in the future.' })
  }

  if (!sports.includes(sport)) {
    return res.status(400).json({ error: 'Invalid sport.' })
  }

  if (!skillLevels.includes(skillLevel)) {
    return res.status(400).json({ error: 'Invalid skill level.' })
  }

  if (typeof coed !== 'boolean') {
    return res.status(400).json({ error: 'Invalid coed setting.' })
  }

  if (typeof maxPlayers !== 'number' || maxPlayers < 2 || maxPlayers > 50) {
    return res.status(400).json({ error: 'Invalid max players.' })
  }

  if (location.length < 2 || location.length > 50) {
    return res
      .status(400)
      .json({ error: 'Location must be between 2 and 50 characters.' })
  }

  const hostUser = await client.user.findUnique({
    where: {
      id: hostId,
    },
  })

  if (!hostUser) {
    return res.status(400).json({ error: 'Invalid host.' })
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
        usersJoinedIds: {
          push: hostId,
        },
      },
    })

    return res
      .status(201)
      .json({ message: 'Event successfully created.', event })
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { id } = req.params

  try {
    const user = req.user as UserToken

    const eventToDelete = await client.event.findUnique({
      where: {
        id,
      },
    })

    if (eventToDelete.hostId !== user.id) {
      return res
        .status(403)
        .json({ error: 'You are not the host of this event.' })
    }

    await client.event.delete({
      where: {
        id,
      },
    })
    // send email to all users who joined the event that it was cancelled
    return res.json({ message: 'Event successfully deleted.' })
  } catch (error) {
    next(error)
  }
}

export const updateEvent = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
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
      return res
        .status(403)
        .json({ error: 'You are not the host of this event.' })
    }

    const data: any = {}

    if (title) {
      if (title.length < 4 || title.length > 50) {
        return res
          .status(400)
          .json({ error: 'Title must be between 4 and 50 characters.' })
      }
      data['title'] = title
    }

    if (description) {
      if (description.length < 10 || description.length > 500) {
        return res.status(400).json({
          error: 'Description must be between 10 and 500 characters.',
        })
      }
      data['description'] = description
    }

    if (date) {
      // Ensure date contains a time
      if (!date.includes('T')) {
        return res.status(400).json({ error: 'Invalid date format.' })
      }

      // Ensure date is in the future
      if (new Date(date) < new Date()) {
        return res.status(400).json({ error: 'Date must be in the future.' })
      }

      data['date'] = date
    }

    if (sport) {
      if (!sports.includes(sport)) {
        return res.status(400).json({ error: 'Invalid sport.' })
      }
      data['sport'] = sport
    }

    if (skillLevel) {
      if (!skillLevels.includes(skillLevel)) {
        return res.status(400).json({ error: 'Invalid skill level.' })
      }
      data['skillLevel'] = skillLevel
    }

    if (location) {
      if (location.length < 2 || location.length > 50) {
        return res
          .status(400)
          .json({ error: 'Location must be between 2 and 50 characters.' })
      }
      data['location'] = location
    }

    if (coed !== undefined) {
      if (typeof coed !== 'boolean') {
        return res.status(400).json({ error: 'Invalid coed setting.' })
      }
      data['coed'] = coed
    }

    if (maxPlayers !== undefined) {
      if (typeof maxPlayers !== 'number' || maxPlayers < 2 || maxPlayers > 50) {
        return res.status(400).json({
          error: 'Max players must be a number between 2 and 50.',
        })
      }

      if (eventToUpdate.usersJoinedIds.length > maxPlayers) {
        return res.status(400).json({
          error:
            'Max players cannot be less than the number of players joined.',
        })
      }

      data['maxPlayers'] = maxPlayers

      // if maxPlayers is increased, move players from waiting list to joined list
      if (maxPlayers > eventToUpdate.maxPlayers) {
        const playersToMove = eventToUpdate.usersWaitingIds.slice(
          0,
          maxPlayers - eventToUpdate.maxPlayers
        )
        data['usersJoinedIds'] = {
          push: playersToMove,
        }
        data['usersWaitingIds'] = {
          set: eventToUpdate.usersWaitingIds.slice(
            maxPlayers - eventToUpdate.maxPlayers
          ),
        }
      }
    }

    const event = await client.event.update({
      where: { id },
      data: data,
    })

    return res.status(201).json({
      message: 'Event successfully updated.',
      event,
    })
  } catch (error) {
    next(error)
  }
}

export const addUserToPlayersJoined = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
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
      return res.status(404).json({ error: 'Event not found.' })
    }

    if (event.usersJoinedIds.includes(userId)) {
      return res
        .status(400)
        .json({ error: 'You have already joined this event.' })
    }

    if (event.usersJoinedIds.length >= event.maxPlayers) {
      return res.status(400).json({ error: 'Event is full.' })
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

    const userJoined = await client.user.findUnique({
      where: {
        id: userId,
      },
    })

    await sendEventConfirmation(event, userJoined)
  } catch (error) {
    next(error)
  }
}

export const addUserToPlayersWaiting = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
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
      return res.status(404).json({ error: 'Event not found.' })
    }

    if (event.usersJoinedIds.includes(userId)) {
      return res
        .status(400)
        .json({ error: 'You have already joined this event.' })
    }

    if (event.usersWaitingIds.includes(userId)) {
      return res
        .status(400)
        .json({ error: 'You are already on the waiting list.' })
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

    return res
      .status(201)
      .json({ message: 'Successfully joined waiting list.', updatedEvent })
  } catch (error) {
    next(error)
  }
}

export const removeUserFromPlayersJoined = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
  const { id } = req.params

  try {
    const user = req.user as UserToken
    const userId = user.id

    const event = (await client.event.findUnique({
      where: {
        id,
      },
    })) as Event

    if (!event) {
      return res.status(404).json({ error: 'Event not found.' })
    }

    if (!event.usersJoinedIds.includes(userId)) {
      return res.status(400).json({ error: 'You have not joined this event.' })
    }

    const updatedPlayers = event.usersJoinedIds.filter(
      (id: string) => id !== userId
    )

    let nextPlayerId: string | undefined

    if (event.usersWaitingIds.length > 0) {
      const nextPlayerId = event.usersWaitingIds.shift() as string
      updatedPlayers.push(nextPlayerId)
    }

    const updatedEvent = await client.event.update({
      where: {
        id,
      },
      data: {
        usersJoinedIds: {
          set: updatedPlayers,
        },
      },
    })

    res.status(201).json({ message: 'Successfully left event.', updatedEvent })

    if (nextPlayerId) {
      const nextPlayer = await client.user.findUnique({
        where: {
          id: nextPlayerId,
        },
      })
      // send email that they are off waiting list
      await sendOffWaitingEmail(event, nextPlayer)
    }
  } catch (error) {
    next(error)
  }
}

export const removeUserFromPlayersWaiting = async (
  req: Request,
  res: Response,
  next: any
): Promise<any> => {
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
      return res.status(404).json({ error: 'Event not found.' })
    }

    if (!event.usersWaitingIds.includes(userId)) {
      return res.status(400).json({ error: 'You are not on the waiting list.' })
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

    return res
      .status(201)
      .json({ message: 'Successfully left waiting list.', updatedEvent })
  } catch (error) {
    next(error)
  }
}
