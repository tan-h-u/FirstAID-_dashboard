// models/Appfeedback.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Appfeedback = sequelize.define('Appfeedback', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  emergency_id: { type: DataTypes.INTEGER, allowNull: true },
  user_id: { type: DataTypes.INTEGER, allowNull: true },

  // ✅ 改這裡：SET -> JSON（陣列）
  patient_conditions: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],    // e.g. ["意識清醒","出血"]
  },
  patient_conditions_other: { type: DataTypes.STRING(255), allowNull: true },

  app_context: {
    type: DataTypes.ENUM('真實急救狀況','模擬演練 / 練習','學習或參考急救知識','其他'),
    allowNull: false,
  },
  app_context_other: { type: DataTypes.STRING(255), allowNull: true },

  // ✅ 改這裡：SET -> JSON（陣列）
  used_features: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],    // e.g. ["CPR 指引","AED 使用指引"]
  },
  used_features_other: { type: DataTypes.STRING(255), allowNull: true },

  app_rating: { type: DataTypes.ENUM('1','2','3','4','5'), allowNull: false },

  usage_time: {
    type: DataTypes.ENUM('事發當下立即打開','事發後幾分鐘才打開','事後回顧或學習'),
    allowNull: false,
  },
  usage_time_other: { type: DataTypes.STRING(255), allowNull: true },

  identity: {
    type: DataTypes.ENUM('一般民眾','醫療相關人員','消防 / 急救人員','學生','其他'),
    allowNull: false,
  },
  identity_other: { type: DataTypes.STRING(255), allowNull: true },

  suggestions: { type: DataTypes.TEXT, allowNull: true },
  submitted_at: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
}, {
  tableName: 'Appfeedback',
  timestamps: false,
  underscored: true,
});

module.exports = Appfeedback;
