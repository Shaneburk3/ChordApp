const client = require('../postgresDB')

const User = {
    create: async (first_name, last_name, email, creation_date, password, callback) => {
            console.log(`[INFO]: Creating user:  ${first_name}`)
            try {
                client.query('INSERT INTO users (first_name, last_name, email, created_at, password) VALUES ($1,$2,$3,$4,$5) ', [first_name, last_name, email, creation_date, password], callback);
                console.log("User Created: ", email)
            } catch (error) {
                console.log(error.message);
            }
    },
    findById: async (user_id) => {
        try {
            const response = await client.query('SELECT * FROM users WHERE "user_ID" = ($1)', [user_id]);
            if (response.rows.length === 0) {
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("FindByID ERROR :(",error.message);
            throw error;
        }
    },
    findByEmail: async (email) => {
        console.log(`Searching for: ${email}`);
        try {
            const response = await client.query('SELECT * FROM users WHERE "email" = ($1)', [email]);
            if (response.rows.length == 0) {
                console.log("didnt find the email.")
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    },
    update: async (data) => {

    },
    delete: async (data) => {

    },
}

module.exports = User;