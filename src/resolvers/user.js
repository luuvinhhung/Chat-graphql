import Joi from 'joi'
import mongoose from 'mongoose'
import { signUp, signIn } from '../schemas'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
import { attemptSignIn, signOut} from '../auth'

export default {
  Query: {
    me: (root, args, { req }, info) => {
      return User.findById(req.session.userId)
    },
    users: (root, args, { req }, info) => {
      return User.find({})
    },
    user: (root, { id }, { req }, info) => {

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not valid user ID`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: async (root, args, { req }, info) => {
      // validation
      // Joi ngung khi validation fail => abortEarly false de kiem tra tat ca
      await Joi.validate(args, signUp, { abortEarly: false })
      const user = User.create(args)
      req.session.userId = user.id
      return user
    },
    signIn: async (root, args, { req }, info) => {
      await Joi.validate(args, signIn, { abortEarly: false })
      const { email, password } = args
      const user = await attemptSignIn(email, password)
      req.session.userId = user.id
      return user
    },
    signOut: async (root, args, { req, res }, info) => {
      return signOut(req, res)
    }
  }
}
