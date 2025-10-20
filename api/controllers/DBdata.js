// DBdata.js 頂部補上這兩行（若還沒有）
const sequelize = require('../config/sequelize'); // 取得實例 → 用 sequelize.fn/col
const { Op } = require('sequelize');

const Emergency = require('../models/Emergency');

exports.getEmergencyDistribution = async (req, res) => {
  try {
    // 不分時間，統計所有 emergency_type；排除 NULL（若要包含可拿掉 where）
    const rows = await Emergency.findAll({
      attributes: [
        'emergency_type',
        [sequelize.fn('COUNT', sequelize.col('emergency_type')), 'count'],
      ],
      where: {
        emergency_type: { [Op.ne]: null },
      },
      group: ['emergency_type'],
      raw: true,
    });

    const data = rows.map(r => ({
      key: r.emergency_type,
      label: r.emergency_type,
      count: Number(r.count),
    }));

    const total = data.reduce((s, x) => s + x.count, 0);

    res.status(200).json({
      metric: 'emergency_type_distribution',
      data,
      total,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('❌ /api/stats/distribution 錯誤：', err);
    res.status(500).json({ success: false, message: '伺服器錯誤', error: err.message });
  }
};

exports.getEmergencyTypes = async (req, res) => {
  try {
    const rows = await Emergency.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.col('emergency_type')), 'emergency_type'],
      ],
      raw: true,
    });

    const types = rows
      .map(r => r.emergency_type)
      .filter(v => v !== null && String(v).trim() !== '');

    res.status(200).json({
      metric: 'emergency_type_list',
      data: types,
      count: types.length,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('❌ /api/emergency-types 錯誤：', err);
    res.status(500).json({ success: false, message: '伺服器錯誤', error: err.message });
  }
};