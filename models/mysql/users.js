'use strict'

import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

const User = sequelize.define('User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.NUMBER
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM(['user', 'admin'])
    }
  },
  {
    timestamps: true
  })

export default User
