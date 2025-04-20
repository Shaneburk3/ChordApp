const client = require('../postgresDB')
//const db = require('../db');

const User = {
    create: (first_name, last_name, email, creation_date, password, callback) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        client.query("INSERT INTO users (first_name, last_name, email, created_at, password) VALUES ($1,$2,$3,$4,$5) ", [first_name, last_name, email, creation_date, password], callback);
    },
    findByEmail: (email, callback) => {
        console.log(`Searching for: ${email}`);
        client.query("SELECT * FROM users WHERE email = ($1)", [email], (err, res) =>{
            if (!err) {
                console.log("Found User: ", res.rows);
                callback(null, res.rows[0])
            } else {
                console.log("Error: ", err.messagge);
                callback(err, null);
            }
            client.end;
        })
    }
}

/*
const User = {
    create: (first_name, last_name, email, register_password1, callback) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        db.run('INSERT INTO users (first_name, last_name, email, register_password1) VALUES (?,?,?,?)', [first_name, last_name, email, register_password1], callback);
    },
    findByEmail: (login_email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [login_email], callback);
    }
}
*/

module.exports = User;