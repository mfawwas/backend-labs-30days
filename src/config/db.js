const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://devuser:devpassword@localhost:5432/backend_labs',
});

pool.on('connect', () => {
  console.log(' Connected to PostgreSQL database');
});

module.exports = pool;