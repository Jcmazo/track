import mongoose from 'mongoose'
import logger from '../utils/logger.js'

const { NODE_ENV, DB_URI, DB_URI_TEST } = process.env

export const connectDB = async () => {
  try {
    const DB_CONNECION = (NODE_ENV !== 'test') ? DB_URI : DB_URI_TEST
    await mongoose.connect(DB_CONNECION)
    logger.info('Connected to Mongo database')
  } catch (err) {
    mongoose.close()
    logger.warn('Could not connect to Mongo database')
  }
}
