import mongoose from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { User } from '.'
// import validator from 'validator'
const userSchema = new mongoose.Schema({
  // options
  email: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
    validate: {
      validator: (email) => User.doesntExist({ email }),
      message: ({ value }) => `Email ${value} has already been taken.`
    }
  },
  username: {
    type: String,
    required: true,
    unique: true,
    // lowercase: true,
    validate: {
      validator: (username) => User.doesntExist({ username }),
      message: ({ value }) => `Username ${value} has already been taken.`
    }
  },
  name: String,
  password: String
}, {
  timestamps: true
})
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10) // arg.password
  }
})
// add static method
userSchema.statics.doesntExist = async function (options) {
  return await this.where(options).countDocuments() === 0
}

userSchema.methods.matchesPassword = function (password) {
  return compare(password, this.password)
}
export default mongoose.model('User', userSchema)
