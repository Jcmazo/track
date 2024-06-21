'use strict'

import request from 'supertest'
import app from '../index.js'
import importModels from '../models/index.js'
import path from 'path'
import { tokenSign } from '../utils/handleJwt.js'
import { testAuthRegister } from './helper/helperData.js'

let JWT_TOKEN
const _dirname = path.resolve()
const filePath = path.join(_dirname, '/test/dump/track.mp3')

let modelUser, modelStorage

const initializeModel = async () => {
  const { userModel, storageModel } = await importModels()
  modelUser = userModel
  modelStorage = storageModel
}

initializeModel()

beforeAll(async () => {
  await modelUser.deleteMany()
  await modelStorage.deleteMany()
  const user = await modelUser.create(testAuthRegister)
  JWT_TOKEN = await tokenSign(user)
})

test('should uplaod file', async () => {
  const response = await request(app)
    .post('/api/v1/storages')
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
    .attach('myFile', filePath)
  expect(response.statusCode).toEqual(201)
  expect(response.body).toHaveProperty('url')
})

test('should create a return all', async () => {
  const response = await request(app)
    .get('/api/v1/storages')
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('items')
})

test('debe retornar todo el detalle del item', async () => {
  const { _id } = await modelStorage.findOne()
  const id = _id.toString()

  const response = await request(app)
    .get(`/api/v1/storages/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('items')
})

test('debe eliminar el item', async () => {
  const { _id } = await modelStorage.findOne()
  const id = _id.toString()

  const response = await request(app)
    .delete(`/api/v1/storages/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('deleted', 1)
})
