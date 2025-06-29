const client = require("../postgresDB");

const Audios = {
    create: async (data) => {
        const { user_id, S3_location, S3_key, chord } = data;
        console.log("User data being saved in audios: ", user_id, S3_location, S3_key, chord)
        try {
            client.query("INSERT INTO audios (user_id, file_name, chord, file_path ) VALUES ($1,$2,$3,$4) ", [user_id, S3_key, chord, S3_location]);
            console.log("User Audio created for user: ", user_id)
        } catch (error) {
            console.log("ERROR Creating PostgreSQL Audio", error)
        }
    },
    findOne: async (audio_id) => {
        console.log("Finding One audio..");
    },
    findByUser_Id: async (user_id) => {
        try {
            const response = await client.query("SELECT * FROM audios WHERE user_id = ($1)", [user_id]);
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