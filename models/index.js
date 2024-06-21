'use strict'

const { ENGINE_DB } = process.env

const pathModels = ENGINE_DB === 'nosql' ? './nosql' : './mysql'

const importModels = async () => {
  const users = await import(`${pathModels}/users.js`)
  const tracks = await import(`${pathModels}/tracks.js`)
  const storage = await import(`${pathModels}/storage.js`)

  return {
    userModel: users.default,
    tracksModel: tracks.default,
    storageModel: storage.default
  }
}

export default importModels
