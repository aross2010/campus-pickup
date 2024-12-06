import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcryptjs'
import client from './libs/prisma'

export const initializePassport = () => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
  }

  passport.use(
    new JWTStrategy(options, async (jwtPayload, done) => {
      try {
        console.log('dee')
        const user = await client.user.findUnique({
          where: { id: jwtPayload.id },
        })
        if (user) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (err) {
        return done(err, false)
      }
    })
  )
}
