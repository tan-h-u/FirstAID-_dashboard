const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emergency_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creation_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    identity: {
      type: DataTypes.ENUM('求助者', '協助者'),
      allowNull: true,
      defaultValue: '求助者',
    },
    suggestions: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    experience: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "feedback",
    timestamps: false,
  }
);

module.exports = Feedback;
