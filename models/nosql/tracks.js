import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

const TracksScheme = new mongoose.Schema(
  {
    name: {
      type: String
    },
    album: {
      type: String
    },
    cover: {
      type: String,
      validaye: {
        validator: (req) => {
          return true
        }
      },
      message: 'ERROR_URL'
    },
    artist: {
      name: {
        type: String
      },
      nickName: {
        type: String
      },
      nationality: {
        type: String
      }
    },
    duration: {
      start: {
        type: Number
      },
      end: {
        type: Number
      }
    },
    mediaId: {
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true, // createdAt and updatedAt
    versionKey: false
  }
)

/**
 * Implemen method with relations a storage find
 */
TracksScheme.statics.findAllData = function () {
  const joinData = this.aggregate([
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    }, {
      $unwind: '$audio'
    }
  ])
  return joinData
}

/**
 * Implemen method with relations a storage find by id
 */
TracksScheme.statics.findOneData = function (id) {
  const joinData = this.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'storages',
        localField: 'mediaId',
        foreignField: '_id',
        as: 'audio'
      }
    },
    {
      $unwind: '$audio'
    }
  ])
  return joinData.exec()
}

TracksScheme.plugin(mongooseDelete, { overrideMethods: 'all' })

export default mongoose.model('Tracks', TracksScheme)
