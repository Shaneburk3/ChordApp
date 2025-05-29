const client = require("../postgresDB");

const Audios = {
    create: async (user_id, user_dob, callback) => {
        try {
            client.query("INSERT INTO user_details (info_id, user_bio, user_city, user_country, user_dob) VALUES ($1,$2,$3,$4,$5) ", [user_id, "You can edit this in the update page!", "City", "Country",user_dob], callback);
            console.log("User details created for user: ", user_id)
        } catch (error) {
            console.log(error.message)
        }
    },
    findOne: async (audio_id) => {
        console.log("Finding One audio..");
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
        const { user_id, user_country, user_city, user_bio, user_dob } = data
        console.log("UPDATE::", data)
        try {
            console.log('Lets update this user...')
            const result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3, user_dob = $4 WHERE info_id = $5 RETURNING info_id`, [user_country, user_city, user_bio, user_dob, user_id]);
            if(result.rowCount === 0) {
                console.log('No updates recieved');
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log("Error updating database:", error.message)
            throw error;
        }
    },
    delete: async (data) => {

    },
}

module.exports = Audios;