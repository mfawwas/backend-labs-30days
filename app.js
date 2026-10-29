require('dotenv').config();
const express = require('express');
const pool = require('./src/config/db');
const redis = require('./src/config/redis');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();
app.use(express.json());

// Health Check Route
app.get('/health', async (req, res, next) => {
  try {
    const dbResult = await pool.query('SELECT NOW()');
    const redisPing = await redis.ping();
    
    res.json({
      status: 'ok',
      dbTime: dbResult.rows[0].now,
      redisResponse: redisPing,
    });
  } catch (error) {
    next(error);
  }
});

// Attach Global Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});