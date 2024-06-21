'use strict'

import request from 'supertest'
import app from '../index.js'
import importModels from '../models/index.js'
import { tokenSign } from '../utils/handleJwt.js'
import { testAuthRegisterAdmin, testDataTrack, testStorageRegister } from './helper/helperData.js'

let modelUser, modelStorage, modelTracks
let STORAGE_ID = ''
let JWT_TOKEN = ''

const initializeModel = async () => {
  const { userModel, storageModel, tracksModel } = await importModels()
  modelUser = userModel
  modelStorage = storageModel
  modelTracks = tracksModel
}

initializeModel()

beforeAll(async () => {
  await modelUser.deleteMany()
  await modelStorage.deleteMany()
  const user = await modelUser.create(testAuthRegisterAdmin)
  const storage = await modelStorage.create(testStorageRegister)
  STORAGE_ID = storage._id.toString()
  JWT_TOKEN = await tokenSign(user)
})

test('deberia registra un item', async () => {
  const dataTracksNew = {
    ...testDataTrack,
    mediaId: STORAGE_ID
  }

  const response = await request(app)
    .post('/api/v1/tracks')
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
    .send(dataTracksNew)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('name')
  expect(body).toHaveProperty('artist')
  expect(body).toHaveProperty('cover')
})

test('should create a return all', async () => {
  const response = await request(app)
    .get('/api/v1/tracks')
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  const { items } = body
  //   idFile = data.docs[0]._id;
  expect(body).toHaveProperty('items')
})

test('debe retornar todo el detalle del item', async () => {
  const { _id } = await modelTracks.findOne()
  const id = _id.toString()
  const response = await request(app)
    .get(`/api/v1/tracks/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('items')
})

test('debe eliminar el item', async () => {
  const { _id } = await modelTracks.findOne()
  const id = _id.toString()
  const response = await request(app)
    .delete(`/api/v1/tracks/${id}`)
    .set('Authorization', `Bearer ${JWT_TOKEN}`)
  const { body } = response
  expect(response.statusCode).toEqual(200)
  expect(body).toHaveProperty('deleted', 1)
})
