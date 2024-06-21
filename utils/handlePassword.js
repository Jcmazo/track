'use strict'

import bcryptjs from 'bcryptjs'

const encrypt = async (passwordPlain) => {
  const hast = await bcryptjs.hash(passwordPlain, 10)
  return hast
}

const compare = async (passwordPlain, hastPasssword) => {
  return await bcryptjs.compare(passwordPlain, hastPasssword)
}

export { encrypt, compare }
