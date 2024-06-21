'use strict'

import handleHttpError from '../utils/handleError.js'

const checkRol = (roles) => (req, res, next) => {
  try {
    const { role: rolesByUser } = req.user
    const checkValueRol = roles.some((rol) => rolesByUser.includes(rol))
    if (!checkValueRol) {
      throw new Error()
    }
    next()
  } catch (err) {
    handleHttpError(res, 'ERROR_PERMISSIONS', 403)
  }
}

export { checkRol }
