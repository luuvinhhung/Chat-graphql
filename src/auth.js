import { AuthenticationError } from 'apollo-server-express'
import { SESS_NAME } from './config'
import { User } from './models'
const signedIn = req => req.session.userId
export const attemptSignIn = async (email, password) => {
  const user = await User.findOne({ email })
  const message = 'Incorrect email or password'
  if (!user) {
    throw new AuthenticationError(message)
  }
  if (!await user.matchesPassword(password)) {
    throw new AuthenticationError(message)
  }
  return user
}

export const ensureSignedIn = req => {
  if (!signedIn(req)) {
    throw new AuthenticationError('You must be signed in!')
  }
}

export const ensureSignedOut = req => {
  if (signedIn(req)) {
    throw new AuthenticationError('You already signed in!')
  }
}

export const signOut = (req, res) => new Promise(
  (resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)
      res.clearCookie(SESS_NAME)
      resolve(true)
    })
  }
)
