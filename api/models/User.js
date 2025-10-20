const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  phone: { type: DataTypes.INTEGER },
  lat: { type: DataTypes.FLOAT },  // 可視情況改為 DOUBLE
  lng: { type: DataTypes.FLOAT },
  fcm_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // ... 其餘欄位略
  temporary: { type: DataTypes.BOOLEAN }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = User;
