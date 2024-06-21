'use strict'

import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/mysql.js'

const Storage = sequelize.define('Storage',
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  })

export default Storage
