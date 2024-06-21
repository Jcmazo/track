'use strict'
import fs from 'node:fs'
import path from 'path'
import importModels from '../models/index.js'
import handleHttpError from '../utils/handleError.js'

let model

const initializeModel = async () => {
  try {
    const { storageModel } = await importModels()
    model = storageModel
  } catch (error) {
    handleHttpError(error)
  }
}

const __dirname = path.resolve()
const MEDIA_PATH = `${__dirname}/storage`

initializeModel()

/**
 * Gets  storage
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
  try {
    const data = await model.find({})
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEMS')
  }
}

/**
 * Get a storage
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
  try {
    const { id } = req.params
    const data = await model.findById(id)
    res.send({ items: data })
  } catch (err) {
    handleHttpError(res, 'ERROR_GET_ITEM')
  }
}

/**
 * create a storage
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
  const { file } = req
  const fileData = {
    fileName: file.filename,
    originalName: file.originalname,
    url: `${process.env.PUBLIC_URL}/${file.filename}`
  }
  const response = await model.create(fileData)
  res.status(201)
  res.send(response)
}

/**
 * Update a storage
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
  try {
    const { body } = req
    const { id } = req.params
    const response = await model.findOneAndUpdate({ _id: id }, body)
    res.send(response)
  } catch (err) {
    handleHttpError(res, 'ERROR_UPDATED_A_ITEM')
  }
}

/**
 * delete a storage
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const dataFile = await model.findById({ _id: id })
    const { fileName } = dataFile
    // filePath = `${MEDIA_PATH}/${fileName}`
    //fs.unlinkSync(filePath)
    const response = await model.deleteOne({ _id: id })
    res.send({ dataFile, deleted: response.deletedCount})
  } catch (err) {
    handleHttpError(res, 'ERROR_DELETE_A_ITEM')
  }
}

export { getItems, getItem, createItem, updateItem, deleteItem }
