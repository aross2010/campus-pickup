import jwt from 'jsonwebtoken'

export const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '30d' })
}
