const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Emergency = sequelize.define(
  "Emergency",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lng:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    responder_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    emergency_type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    tableName: "emergency",
    timestamps: false,
  },
);

module.exports = Emergency;