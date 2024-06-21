'use strict'

import logger from './utils/logger.js'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import openApiconfigration from './doc/swagger.js'
import routes from './routes/index.js'
import { connectDB } from './config/mongo.js'
import { connectDBMysql } from './config/mysql.js'
import morganBody from 'morgan-body'
import { loggerStream } from './utils/handleLogger.js'

const { ENGINE_DB, NODE_ENV } = process.env

const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.static('storage'))

morganBody(app, {
  noColors: true,
  stream: loggerStream,
  skip: function (req, res) {
    return res.statusCode < 400
  }
})

// route for documentation
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiconfigration))

routes(app)

ENGINE_DB === 'nosql'
  ? connectDB()
  : connectDBMysql()

if (NODE_ENV === 'development' || NODE_ENV === 'production') {
  app.listen(process.env.PORT, () => {
    logger.info(`listening on port ${process.env.PORT}`)
  })
}

export default app
