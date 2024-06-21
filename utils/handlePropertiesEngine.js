'use strict'

const { ENGINE_DB } = process.env

const getProperties = () => {
  const data = {
    nosql: {
      id: '_id'
    },
    mysql: {
      id: 'id'
    }
  }
  return data[ENGINE_DB]
}

export { getProperties }
