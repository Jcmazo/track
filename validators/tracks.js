'use strict'

import { check } from 'express-validator'
import validateResults from '../utils/handleValidator.js'

const validatorGetItem = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorCreateItem = [
  check('name').exists().notEmpty(),
  check('album').exists().notEmpty(),
  check('cover').exists().notEmpty(),
  check('artist').exists().notEmpty(),
  check('artist.name').exists().notEmpty(),
  check('artist.nickName').exists().notEmpty(),
  check('artist.nationality').exists().notEmpty(),
  check('duration').exists().notEmpty(),
  check('duration.start').exists().notEmpty(),
  check('duration.end').exists().notEmpty(),
  check('mediaId').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

export { validatorGetItem, validatorCreateItem }
