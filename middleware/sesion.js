'use strict'

import handleHttpError from '../utils/handleError.js'
import { verifyToken } from '../utils/handleJwt.js'
import importModels from '../models/index.js'
import { getProperties } from '../utils/handlePropertiesEngine.js'
const propertiesKey = getProperties()

let model

const initialize = async () => {
  try {
    const { userModel } = await importModels()
    model = userModel
  } catch (error) {
    handleHttpError(error)
  }
}

initialize()

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'NOT_TOKEN', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (!dataToken) {
      throw new Error('No data payload')
    }

    const query = {
      [propertiesKey.id]: dataToken[propertiesKey.id]
    }

    const user = await model.findOne(query)
    req.user = user

    next()
  } catch (err) {
    handleHttpError(res, 'NOT_SESSION', 401)
  }
}

export { authMiddleware }
