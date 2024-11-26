import client from '../libs/prisma'
import { Event, School, User } from '@prisma/client'
import {
  bios,
  firstNames,
  lastNames,
  majors,
  schools,
  schoolYear,
  seededEvents,
  sports,
} from '../libs/data'

/* This page seeds the database with random data for use in testing. Will automate seeding to keep data in db. */

const seedSchools = async () => {
  await client.school.deleteMany()

  schools.forEach(async (school) => {
    const uni = await client.school.create({
      data: school,
    })
  })
}

const seedUsers = async (numUsers: number) => {
  const users: User[] = []

  await client.user.deleteMany()

  const schools = (await client.school.findMany()) as School[]

  for (let i = 0; i < numUsers; i++) {
    const school = schools[Math.floor(Math.random() * schools.length)]
    const schoolId = school.id
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const email = `${firstName}.${lastName}${Math.random() * 100}@${
      school.emailDomain
    }`
    const password = 'password'
    const bio = bios[Math.floor(Math.random() * bios.length)]
    const profileImage = 'https://picsum.photos/200'
    const coverImage = 'https://picsum.photos/800/200'
    const major = majors[Math.floor(Math.random() * majors.length)]
    // random number between 1 and 4
    const numSports = Math.floor(Math.random() * 4) + 1
    const favoriteSports = [] as string[]
    for (let j = 0; j < numSports; j++) {
      // random n amount of sports - no duplicates
      const sport = sports[Math.floor(Math.random() * sports.length)]
      if (!favoriteSports.includes(sport)) {
        favoriteSports.push(sport)
      }
    }
    const year = schoolYear[Math.floor(Math.random() * schoolYear.length)]

    try {
      await client.user.create({
        data: {
          schoolId,
          firstName,
          lastName,
          email,
          password,
          bio,
          profileImage,
          coverImage,
          major,
          favoriteSports,
          schoolYear: year,
        },
      })

      await client.school.update({
        where: {
          id: schoolId,
        },
        data: {
          numUsers: {
            increment: 1,
          },
        },
      })
    } catch (e) {
      console.error(e)
      return
    }
  }
}

const seedEvents = async (numEvents: number) => {
  await client.event.deleteMany()
  for (let i = 0; i < numEvents; i++) {
    const userIndex = Math.floor(Math.random() * 100)
    const userHost = (await client.user.findMany({
      skip: userIndex,
      take: 1,
    })) as User[]
    const host = userHost[0]
    const school = await client.school.findUnique({
      where: {
        id: host.schoolId,
      },
    })
    const coed = Math.random() > 0.5 ? true : false
    const totalCount = await client.user.count()
    const randomOffset = Math.floor(Math.random() * totalCount)
    const users = (await client.user.findMany({
      skip: randomOffset,
      take: Math.ceil(Math.random() * 4),
    })) as User[]
    const playersJoined = []
    for (let j = 0; j < users.length; j++)
      if (users[j].id !== host.id) playersJoined.push(users[j].id)
    const eventData = seededEvents[i]
    try {
      const event = (await client.event.create({
        data: {
          coed,
          hostId: host.id,
          schoolId: host.schoolId,
          usersJoinedIds: playersJoined,
          ...eventData,
          date: new Date(eventData.date).toISOString(),
          discussion: {
            create: {},
          },
        },
      })) as Event
      playersJoined.forEach(async (userId) => {
        await client.user.update({
          where: {
            id: userId,
          },
          data: {
            eventsJoinedIds: {
              push: event.id,
            },
          },
        })
      })
    } catch (e) {
      console.error(e)
      return
    }
  }
}

const seed = async () => {
  await seedSchools()
  await seedUsers(100)
  await seedEvents(100)
}

// seed()
