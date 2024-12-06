import client from '../libs/prisma'
import { Request, Response } from 'express'

export const getAllSchools = async (req: Request, res: Response) => {
  const schools = await client.school.findMany()
  res.json(schools)
}

export const getSchoolById = async (req: Request, res: Response) => {
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
}
