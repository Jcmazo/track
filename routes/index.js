'use strict'
import storage from './storages.js'
import track from './tracks.js'
import user from './users.js'
import auth from './auth.js'

const routes = {
  storages: storage,
  tracks: track,
  users: user,
  auths: auth
}

export default (app) => {
  Object.entries(routes).forEach(([route, handler]) => {
    handler(app, `/api/v1/${route}`)
  })
}
