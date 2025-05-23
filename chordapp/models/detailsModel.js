const client = require("../postgresDB");

const Details = {
    create: async (user_id, callback) => {
        try {
            client.query("INSERT INTO user_details (info_id, user_bio, user_city, user_country) VALUES ($1,$2,$3,$4) ", [user_id, "You can edit this in the update page!", "City", "Country"], callback);
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
    update: async (data) => {
        const { user_id, user_country, user_city, user_bio } = data
        console.log("UPDATE::", data)
        try {
            console.log('Lets update this user...')
            const result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3 WHERE user_id = $4 RETURNING user_id`, [user_country, user_city, user_bio, user_id]);
            if(!result) {
                console.log('No updates recieved');
                return result.status(400).json({ message: "No updates received." });
            }
            return result.status(200).json({ message: "User update successful" , user: result })
        } catch (error) {
            console.log("Error updating database:", error.message)
            throw error;
        }
    },
    delete: async (data) => {

    },
}

module.exports = Details;