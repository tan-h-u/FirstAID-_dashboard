const express = require('express');
const router = express.Router();

// 直接解構需要的處理器
const { getEmergencyTypes, getEmergencyDistribution } = require('../controllers/DBdata');

// 回傳所有不重複的 emergency_type（不分時間）
router.get('/emergency-types', getEmergencyTypes);

// 回傳 emergency_type 的分佈統計（不分時間）
router.get('/stats/distribution', getEmergencyDistribution);

module.exports = router;
