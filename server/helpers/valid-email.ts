import { validEmailDomains } from '../libs/data'

export const isvalidEmail = (email: string): boolean => {
  const emailDomain = email.split('@')[1]
  return validEmailDomains.has(emailDomain)
}
