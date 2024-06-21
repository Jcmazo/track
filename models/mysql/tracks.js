'use strict'

import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/mysql.js'
import Storage from './storage.js'

const Tracks = sequelize.define('Tracks',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist_duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration_start: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    duration_end: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mediaId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true
  })

/**
 * Implemen method with relations a storage find
 */

Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'audio'
  })

  return Tracks.findAll({ include: 'audio' })
}

/**
 * Implemen method with relations a storage find by id
 */
Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storage, {
    foreignKey: 'mediaId',
    as: 'audio'
  })

  return Tracks.findOne({ where: { id }, include: 'audio' })
}

export default Tracks
