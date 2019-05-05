import mongoose from 'mongoose'
import { hash } from 'bcryptjs'
// import validator from 'validator'
const userSchema = new mongoose.Schema({
  // options
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  //   lowercase: true,
  //   validate: (value) => {
  //     return validator.isEmail(value)
  //   }
  // },
  email: String,
  username: String,
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
export default mongoose.model('User', userSchema)
