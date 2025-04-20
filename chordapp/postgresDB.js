const { Client } = require('pg');

  const client = new Client({
        host: "localhost",
        user: "postgres",
        database: "chordExplorer",
        password: "F7d4rbhwkab3",
        port: 5432,
    });

    client.connect();

    client.query('Select * from users', (err, res) =>{
        if (!err) {
            console.log(res.rows);
        } else {
            console.log("Error: ",err.messagge);
        }
        client.end;
    })

    module.exports = client;