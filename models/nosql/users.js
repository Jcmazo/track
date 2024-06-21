import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const UserScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    role: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true, // createdAt and updatedAt
    versionKey: false
  }
)

UserScheme.plugin(mongooseDelete, { overrideMethods: 'all' })

export default mongoose.model('Users', UserScheme)
