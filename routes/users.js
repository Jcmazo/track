'use strict'

import { getUsers, getUser, updateUser, deleteUser } from '../controllers/users.js'

export default (app, route) => {
  app.get(route, getUsers)
  app.get(`${route}/:id`, getUser)
  app.patch(`${route}/:id`, updateUser)
  app.delete(`${route}/:id`, deleteUser)
}
