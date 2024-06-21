'use strict'

import importModels from '../models/index.js'
import handleHttpError from '../utils/handleError.js'
import { compare, encrypt } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js'

let model

const initializeModel = async () => {
  try {
    const { userModel } = await importModels()
    model = userModel
  } catch (error) {
    handleHttpError(error)
  }
}

initializeModel()

/**
 * create a user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    const { body } = req
    const password = await encrypt(body.password)
    const response = await model.create({ ...body, password })
    response.set('password', undefined, { strict: false })

    const data = { token: await tokenSign(response), user: response }
    res.status(201)
    res.send(data)
  } catch (err) {
    handleHttpError(res, 'ERROR_CREATED_A_USER')
  }
}

/**
 * login a user
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const { body } = req
    const user = await model.findOne({ email: body.email })

    if (!user) {
      handleHttpError(res, 'USER_NOT_FOUNT', 404)
      return
    }

    const hashPassword = user.password
    const check = await compare(body.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'PASSWORD_INVALID', 401)
      return
    }

    user.set('password', undefined, { strict: false })

    const data = { token: await tokenSign(user), user }

    res.send(data)
  } catch (err) {
    handleHttpError(res, 'ERROR_LOGIN_A_USER')
  }
}

export { login, createUser }
