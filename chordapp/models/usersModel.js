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
    updateUser: async (user_id) => {
        console.log(`Updating user ID: ${user_id}`);
        try {
            const response = await client.query('UPDATE users.*, user_details.* FROM users INNER JOIN user_details ON users."user_ID" = user_details."user_id" WHERE users."user_ID" = ($1)', [user_id]);
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
    deleteUser: async (data) => {

    },
    getUserWithDetails: async(user_id) => {
        console.log(`Searching for user ID: ${user_id}`);
        try {
            const response = await client.query('SELECT users.*, user_details.* FROM users INNER JOIN user_details ON users."user_ID" = user_details."user_id" WHERE users."user_ID" = ($1)', [user_id]);
            if (response.rows.length == 0) {
                console.log("didnt find the email.")
                return false;
            } else {
                console.log("usersModel, 68: ", response.rows[0])
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    }    

    }

module.exports = User;