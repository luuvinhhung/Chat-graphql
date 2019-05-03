import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  //   unique: true
  // }
  email: String,
  username: String,
  name: String,
  password: String
}, {
  timestamps: true
})
userSchema.pre('save')
export default mongoose.model('User', userSchema)
