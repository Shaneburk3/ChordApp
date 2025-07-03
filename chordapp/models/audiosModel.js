const pool = require('../postgresDB')

const Audios = {
    create: async (data) => {
        const { user_id, S3_location, S3_key, chord } = data;
        client = await pool.connect();
        console.log("User data being saved in audios: ", user_id, S3_location, S3_key, chord)
        try {
            const reponse = await client.query("INSERT INTO audios (user_id, file_name, chord, file_path ) VALUES ($1,$2,$3,$4) RETURNING user_id", [user_id, S3_key, chord, S3_location]);
            console.log("User Audio created for user: ", user_id)
            return reponse.rows[0];
        } catch (error) {
            console.log("ERROR Creating PostgreSQL Audio", error)
        }
        finally { 
        client.release();        
        }
    },
    findOne: async (audio_id) => {
        console.log("Finding One audio..");
        client = await pool.connect();
        if (!audio_id) {
            console.log("No audio ID provided.");
            return false;
        }
        try {
            const response = await client.query("SELECT * FROM audios WHERE audio_id = ($1)", [audio_id]);
            if (response.rows.length == 0) {
                return false;
            } else {
                return response.rows;
            }
        } catch (error) {
            console.log("GetUserInfo ERROR:", error.message);
        }
        finally {
            client.release();
        }
    },
    getUserAudios: async (user_id) => {
        try {
            client = await pool.connect();
            const response = await client.query("SELECT * FROM audios WHERE user_id = ($1)", [user_id]);
            if (response.rows.length == 0) {
                return false;
            } else {
                return response.rows;
            }
        } catch (error) {
            console.log("GetUserInfo ERROR:", error.message);
        } 
        finally {
            client.release();
        }
    },
    delete: async (audio_id) => {
        console.log("Deleting One audio..");
        const client = await pool.connect();

        try {
            const response = await client.query("DELETE FROM audios WHERE audio_id = $1 RETURNING audio_id", [audio_id]);
            if (response.rows.length == 0) {
                return false;
            } else {
                return response.rows;
            }
        } catch (error) {
            console.log("delete single audio ERROR:", error.message);
        } finally {
            client.release();
        }
    },
    deleteUser: async (user_id, res, next) => {
        console.log(`Deleting user ${user_id} from audios DB..`);
        let response;
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            response = await client.query("DELETE FROM audios WHERE user_id = $1 RETURNING user_id", [user_id]);
            if (response.rows.length === 0) {
                await client.query('ROLLBACK');
                console.log('Not user audios to delete.');
                await client.query('COMMIT');
                await client.release();
                return false;;
            }
            await client.query('COMMIT');
            console.log(`User ${response} deleted from audios`)
            return response.rows[0];
        } catch (error) {
            console.log("Deleting user from audios DB error:", error.message);
            return false;
        } finally {
            client.release();
        }
    },
}

module.exports = Audios;