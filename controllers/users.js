'use strict'

import importModels from '../models/index.js'
import handleHttpError from '../utils/handleError.js'
import { encrypt } from '../utils/handlePassword.js'
import { tokenSign } from '../utils/handleJwt.js'

let modelUser

const initializeModel = async () => {
  try {
    const { userModel } = await importModels()
    modelUser = userModel
  } catch (error) {
    handleHttpError(error)
  }
}

initializeModel()

/**
 * Gets  user
 * @param {*} req
 * @param {*} res
 */
const getUsers = async (req, res) => {
  try {
    const data = await modelUser.find({})
    data.forEach(user => {
      user.set('password', undefined, { strict: false })
    })
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * Get a users
 * @param {*} req
 * @param {*} res
 */
const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const data = await modelUser.findById(id)
    data.set('password', undefined, { strict: false })
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
 * create a user
 * @param {*} req
 * @param {*} res
 */
const createUser = async (req, res) => {
  try {
    const { body } = req
    const password = await encrypt(body.password)
    const response = await modelUser.create({ ...body, password })
    response.set('password', undefined, { strict: false })

    const data = { token: await tokenSign(response), user: response }

    res.send(data)
  } catch (err) {
    handleHttpError(res, 'ERROR_CREATED_A_USER')
  }
}

/**
 * Update a user
 * @param {*} req
 * @param {*} res
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { data } = req
    const response = await modelUser.findOneAndUpdate({ _id: id }, data)
    res.send(response)
  } catch (err) {
    handleHttpError(res, 'ERROR_UPDATED_A_ITEM')
  }
}

/**
 * delete a user
 * @param {*} req
 * @param {*} res
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const response = await modelUser.delete({ _id: id })
    res.send(response)
  } catch (err) {
    handleHttpError(res, 'ERROR_DELETE_A_ITEM')
  }
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
