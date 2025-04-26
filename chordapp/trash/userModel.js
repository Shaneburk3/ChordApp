const client = require('../postgresDB')
//const db = require('../db');

const User = {
    create: (first_name, last_name, email, creation_date, password, callback) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        try {
            client.query("INSERT INTO users (first_name, last_name, email, created_at, password) VALUES ($1,$2,$3,$4,$5) ", [first_name, last_name, email, creation_date, password], callback);
            console.log("User Created: ", email)
        } catch (error) {
            console.log(error.message);
        }
    },
    createUserDetails: (user_id, callback) => {
        try {
            client.query("INSERT INTO user_details (user_id, user_bio, user_age, user_city, user_country, user_phone) VALUES ($1,$2,$3,$4,$5, $6) ", [user_id, "You can edit this in the update page!", 0, "city", "country", 11111111], callback);
            console.log("User details created for user: ", user_id)
        } catch (error) {
            console.log(error.message)
        }
    },
    findByEmail: async (email) => {
        console.log(`Searching for: ${email}`);
        try {
            const response = await client.query("SELECT * FROM users WHERE email = ($1)", [email]);
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
    findUserByID: async (user_id) => {
        try {
            const response = await client.query("SELECT * FROM users WHERE user_ID = ($1)", [user_id]);
            if (response.rows.length === 0) {
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }, 
    updateProfile: async (user_ID, user_bio, user_age, user_city, user_country, user_phone) => {
        try {
        client.query("INSERT INTO user_details ($1, $2, $3, $4, $5, $6)", [user_ID], [user_bio], [user_age], [user_city], [user_country], [user_phone], [user_phone], (req, res));
        } catch (error) {
            console.log("Error updating database:", error.message)
        }
    },
    findDetailsByID: async (user_id) => {
        try {
            const response = await client.query("SELECT * FROM user_details WHERE user_id = ($1)", [user_id]);
            if (response.rows.length == 0) {
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("GetUserInfo ERROR:", error.message);
        }
    }
}

module.exports = User;