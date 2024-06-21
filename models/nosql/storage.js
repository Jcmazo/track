import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String
    },
    fileName: {
      type: String
    },
    originalName: {
      type: String
    }
  },
  {
    timestamps: true, // createdAt and updatedAt
    versionKey: false
  }
)

StorageScheme.plugin(mongooseDelete, { overrideMethods: 'all' })

export default mongoose.model('Storage', StorageScheme)
