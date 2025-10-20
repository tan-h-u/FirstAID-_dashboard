// index.js（修正後重點片段）
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// ⬇️ 改這行：拿到 sequelize 實例，而不是 { initDb }
const sequelize = require("./config/sequelize");

const dbdataRoutes = require("./routers/DBrouter");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
  origin: process.env.DASHBOARD_ORIGIN || "http://localhost:3000",
  credentials: false,
}));

app.use("/api", dbdataRoutes);

app.use((req, res) => res.status(404).json({ success: false, message: "Not Found" }));
app.use((err, _req, res, _next) => {
  console.error("Global error:", err);
  res.status(500).json({ success: false, message: "Server Error", error: err.message });
});

const port = Number(process.env.PORT || 3001);

// （可選）啟動前檢查 DB 連線
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");
  } catch (e) {
    console.error("❌ DB connection failed:", e);
  }

  app.listen(port, () => console.log(`✅ backend on http://localhost:${port}`));
})();
