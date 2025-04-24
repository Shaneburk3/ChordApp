const client = require('../postgresDB')
//const db = require('../db');

const User = {
    create: (first_name, last_name, email, creation_date, password, callback) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        client.query("INSERT INTO users (first_name, last_name, email, created_at, password) VALUES ($1,$2,$3,$4,$5) ", [first_name, last_name, email, creation_date, password], callback);
    },
    findByEmail: async (email) => {
        console.log(`Searching for: ${email}`);
        try {
            let response = await client.query("SELECT * FROM users WHERE email = ($1)", [email]);
            if (response.rows.length == 0) {
                console.log("Did not find email linked to any account.");
                return false;
            } else {
                console.log("Found a user.");
                return response;
            }
        } catch (error) {
            console.log("ERROR:", error.message);
        }
        //client.end();  
    },
    getByID: (user_id) => {
        client.query("SELECT * FROM users WHERE user_ID = ($1)", [user_id], (err, res) => {
            if (!err) {
                callback(null, res.rows[0]);
            } else {
                console.log("Error getting user with ID:", err.messgae);
                callback(err, null);
            }
            //client.end;
        });
    }
}

module.exports = User;