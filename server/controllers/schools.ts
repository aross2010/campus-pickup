import client from '../libs/prisma'
import { Request, Response } from 'express'

export const getAllSchools = async (
  req: Request,
  res: Response
): Promise<any> => {
  const schools = await client.school.findMany()
  return res.status(200).json(schools)
}

export const getSchoolById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params
  const school = await client.school.findUnique({
    where: {
      id,
    },
  })
  if (!school) {
    return res.status(404).json({ error: 'School not found' })
  }
  res.status(200).json(school)
}
