// config/sequelize.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// 建立 Sequelize 實例
const sequelize = new Sequelize(
  process.env.DB_NAME || 'authapp',        // 資料庫名稱
  process.env.DB_USER || 'root',         // 使用者名稱
  process.env.DB_PASS || '',             // 密碼
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // 顯示 SQL 查詢可設為 true 以除錯
    define: {
      freezeTableName: true, // 不自動加 s
      timestamps: false,     // 不自動加 createdAt、updatedAt
    },
    dialectOptions: {
      // optional: 若連線遠端 MySQL 需 SSL 可設定
      // ssl: { require: true, rejectUnauthorized: false }
    }
  }
);

// 測試連線
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
