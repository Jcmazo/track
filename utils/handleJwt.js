'use strict'

import jwt from 'jsonwebtoken'
import { getProperties } from './handlePropertiesEngine.js'
const propertiesKey = getProperties()

const { JWT_SECRET } = process.env

const tokenSign = async (user) => {
  const sign = await jwt.sign(
    {
      [propertiesKey.id]: user[propertiesKey.id],
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: '4d'
    }
  )
  return sign
}

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET)
  } catch (err) {
    return null
  }
}

export { tokenSign, verifyToken }
