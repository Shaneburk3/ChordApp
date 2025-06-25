const client = require("../postgresDB");

const Audios = {
    create: async (user_id, audio, callback) => {
        try {
            client.query("INSERT INTO user_details (user_id, title, path) VALUES ($1,$2,$3) ", [user_id, ,audio], callback);
            console.log("User details created for user: ", user_id)
        } catch (error) {
            console.log(error.message)
        }
    },
    findOne: async (audio_id) => {
        console.log("Finding One audio..");
    },
    findByUser_Id: async (user_id) => {
        try {
            const response = await client.query("SELECT * FROM user_audios WHERE user_id = ($1)", [user_id]);
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

    },
    delete: async (data) => {

    },
}

module.exports = Audios;