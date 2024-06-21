'use strict'

import importModels from '../models/index.js'
import handleHttpError from '../utils/handleError.js'
import { matchedData } from 'express-validator'

let model

const initializeModel = async () => {
  try {
    const { tracksModel } = await importModels()
    model = tracksModel
  } catch (error) {
    handleHttpError(error)
  }
}

initializeModel()

/**
 * Gets  item
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await model.findAllData({})
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * Get a item
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const data = await model.findOneData(id)
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
 * create a item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  try {
    const body = matchedData(req)
    const response = await model.create(body)
    res.send(response)
  } catch (err) {
    handleHttpError(res, 'ERROR_CREATED_A_ITEM')
  }
}

/**
 * Update a item
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req)
    const response = await model.findOneAndUpdate({ _id: id }, data)
    res.send(response)
  } catch (err) {
    handleHttpError(res, 'ERROR_UPDATED_A_ITEM')
  }
}

/**
 * delete a item
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req)
    const response = await model.deleteOne({ _id: id })
    res.send({ deleted: response.deletedCount })
  } catch (err) {
    handleHttpError(res, 'ERROR_DELETE_A_ITEM')
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem }
