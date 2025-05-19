const { Client } = require('pg');

  const client = new Client({
        host: "localhost",
        user: "postgres",
        database: "chordExplorer",
        password: "F7d4rbhwkab3",
        port: 5432,
    });

    client.connect();
  
module.exports = client;