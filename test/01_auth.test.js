'use strict'

import request from 'supertest'
import app from '../index.js'
import importModels from '../models/index.js'
import { testAuthLogin, testAuthRegister } from './helper/helperData.js'

let model

const initializeModel = async () => {
  const { userModel } = await importModels()
  model = userModel
}

initializeModel()

beforeAll(async () => {
  await model.deleteMany()
})

test('this should return a 404', async () => {
  const response = await request(app)
    .post('/api/v1/auths/login')
    .send(testAuthLogin)

  expect(response.statusCode).toEqual(404)
})

test('this should return a 201', async () => {
  const response = await request(app)
    .post('/api/v1/auths/register')
    .send(testAuthRegister)

  expect(response.statusCode).toEqual(201)
  expect(response.body).toHaveProperty('token')
  expect(response.body).toHaveProperty('user')
})

test('esto deberia de retornar password no valido 401', async () => {
  const newTestAuthLogin = { ...testAuthLogin, password: '22222222' }
  const response = await request(app)
    .post('/api/v1/auths/login')
    .send(newTestAuthLogin)

  expect(response.statusCode).toEqual(401)
})

test('esto deberia de retornar 200 login exitoso', async () => {
  const response = await request(app)
    .post('/api/v1/auths/login')
    .send(testAuthRegister)

  expect(response.statusCode).toEqual(200)
})
