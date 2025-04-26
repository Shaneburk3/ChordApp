const client = require("../postgresDB");

const Details = {
    create: async (user_id, callback) => {
        try {
            client.query("INSERT INTO user_details (user_id, user_bio, user_age, user_city, user_country, user_phone) VALUES ($1,$2,$3,$4,$5, $6) ", [user_id, "You can edit this in the update page!", 0, "Enter City", "Enter Country", null], callback);
            console.log("User details created for user: ", user_id)
        } catch (error) {
            console.log(error.message)
        }
    },
    findById: async (user_id) => {
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
    },
    update: async (user_id, user_bio, user_age, user_city, user_country, user_phone) => {
        try {
        client.query("INSERT INTO user_details ($1, $2, $3, $4, $5, $6)", [user_id], [user_bio], [user_age], [user_city], [user_country], [user_phone], [user_phone], (req, res));
        } catch (error) {
            console.log("Error updating database:", error.message)
        }
    },
    delete: async (data) => {

    },
}

module.exports = Details;