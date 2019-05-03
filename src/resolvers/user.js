import mongoose from 'mongoose'
import { User } from '../models'
import { UserInputError } from 'apollo-server-express'
export default {
  Query: {
    users: (root, arg, context, info) => {
      return User.find({})
    },
    user: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id}`)
      }
      return User.findById(id)
    }
  },
  Mutation: {
    signUp: (root, arg, context, info) => {
      // validation
      
      return User.create(arg)
    }
  }
}
