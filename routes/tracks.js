'use strict'

import { getItems, getItem, createItem, updateItem, deleteItem } from '../controllers/tracks.js'
import { validatorGetItem, validatorCreateItem } from '../validators/tracks.js'
import { authMiddleware } from '../middleware/sesion.js'
import { checkRol } from '../middleware/rol.js'

export default (app, route) => {
  app.get(route, authMiddleware, checkRol(['admin', 'user']), getItems)
  app.get(`${route}/:id`, authMiddleware, validatorGetItem, getItem)
  app.post(route, authMiddleware, validatorCreateItem, createItem)
  app.patch(`${route}/:id`, authMiddleware, validatorGetItem, validatorCreateItem, updateItem)
  app.delete(`${route}/:id`, authMiddleware, validatorGetItem, deleteItem)
}
