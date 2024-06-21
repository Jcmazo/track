'use strict'

import { Sequelize } from 'sequelize'
import logger from '../utils/logger.js'

const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env

const dataBase = MYSQL_DATABASE
const userName = MYSQL_USER
const password = MYSQL_PASSWORD
const host = MYSQL_HOST

const sequelize = new Sequelize(dataBase, userName, password, { host, dialect: 'mysql' })

const connectDBMysql = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Connected to Mysql database')
  } catch (err) {
    logger.warn('Could not connect to Mysql database')
  }
}

export { connectDBMysql, sequelize }
