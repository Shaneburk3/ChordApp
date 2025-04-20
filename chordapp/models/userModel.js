const db = require('../db');

const User = {
    create: (first_name, last_name, email, register_password1, callback) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        db.run('INSERT INTO users (first_name, last_name, email, register_password1) VALUES (?,?,?,?)', [first_name, last_name, email, register_password1], callback);
    },
    findByEmail: (login_email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [login_email], callback);
    }
}

module.exports = User;