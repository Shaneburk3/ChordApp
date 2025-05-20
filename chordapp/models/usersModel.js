const client = require('../postgresDB')

const User = {
    create: async (first_name, last_name, email, creation_date, password) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        try {
            const role = "BASIC";
            const response = await client.query('INSERT INTO users (first_name, last_name, email, created_at, password, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING "user_id"', [first_name, last_name, email, creation_date, password, role]);
            console.log("User Created: ", email)
            return response.rows[0]
        } catch (error) {
            console.log(error.message)
        }
    },
    findById: async (user_id) => {
        console.log(`findByID: ${user_id}`);
        const query = `SELECT 
        users.user_id,
        users.first_name,
        users.last_name, 
        users.email, 
        users.created_at, 
        users.role, 
        user_details.user_bio, 
        user_details.user_age, 
        user_details.user_city, 
        user_details.user_country 
        FROM users JOIN user_details ON users.user_id = user_details.info_id WHERE users.user_id = ($1)`;
        try {
            const response = await client.query(query, [user_id]);
            if (response.rows.length === 0) {
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("FindByID ERROR :(", error.message);
            throw error;
        }
    },
    findOne: async (email) => {
        console.log(`Searching for: ${email}`);
        try {
            const response = await client.query('SELECT * FROM users WHERE "email" = ($1)', [email]);
            if (response.rows.length == 0) {
                console.log("User not found.")
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    },
    update: async (user_id) => {
        console.log(`Updating user ID: ${user_id}`);
        try {
            const response = await client.query('UPDATE users.*, user_details.* FROM users INNER JOIN user_details ON users."user_id" = user_details."info_id" WHERE users."user_id" = ($1)', [user_id]);
            if (response.rows.length == 0) {
                console.log("didnt find the email.")
                return false;
            } else {
                console.log("user updated")
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    },
    delete: async (data) => {

    }
}

module.exports = User;