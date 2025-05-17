const client = require('../postgresDB')

const User = {
    create: async (first_name, last_name, email, creation_date, password) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        try {
            const role = "BASIC";
            const response = await client.query('INSERT INTO users (first_name, last_name, email, created_at, password, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING "user_ID"', [first_name, last_name, email, creation_date, password, role]);
            console.log("User Created: ", email)
            return response.rows[0]
        } catch (error) {
            console.log(error.message)
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
            console.log("FindByID ERROR :(", error.message);
            throw error;
        }
    },
    findOne: async (email) => {
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
    update: async (user_id) => {
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
    delete: async (data) => {

    },
    getUserWithDetails: async (user_id) => {
        console.log(`Searching for user ID: ${user_id}`);
        try {
            const response = await client.query('SELECT users.*, user_details.* FROM users INNER JOIN user_details ON users."user_ID" = user_details."user_id" WHERE users."user_ID" = ($1)', [user_id]);
            if (response.rows.length == 0) {
                console.log("didnt find the email.")
                return false;
            } else {
                //console.log("usersModel, 68: ", response.rows[0])
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    }

}

module.exports = User;