const { Client } = require('pg');

  const client = new Client({
        host: "localhost",
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: 5432,
    });

    client.connect();
  
module.exports = client;