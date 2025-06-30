const { Pool } = require('pg');
require('dotenv').config();

  const pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });
  
module.exports = pool;