const pool = require('../postgresDB')

const Details = {
    create: async (user_id, user_dob) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            await client.query("INSERT INTO user_details (info_id, user_bio, user_city, user_country, user_dob) VALUES ($1,$2,$3,$4,$5) ", [user_id, "You can edit this in the update page!", "City", "Country", user_dob]);
            console.log("User details created for user: ", user_id)
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.log(error.message)
        } finally {
            client.release()
        }
    },
    findById: async (user_id) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const response = await client.query("SELECT * FROM user_details WHERE user_id = $1", [user_id]);
            if (response.rows.length == 0) {
                await client.query('ROLLBACK');
                return false;
            } else {
                await client.query('COMMIT');

                return response.rows[0];
            }
        } catch (error) {
            console.log("GetUserInfo ERROR:", error.message);
        } finally {
            client.release();
        }
    },
    update: async (data) => {

        const { user_id, user_country, user_city, user_bio, user_dob } = data
        console.log("UPDATE::", data)
        const client = await pool.connect();

        try {
            console.log('Lets update this user...');
            await client.query('BEGIN');
            const result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3, user_dob = $4 WHERE info_id = $5 RETURNING info_id`, [user_country, user_city, user_bio, user_dob, user_id]);
            if (result.rowCount === 0) {
                await client.query('ROLLBACK');
                console.log('No updates recieved');
                return null;
            }
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("Error updating database:", error.message)
            throw error;
        } finally {
            client.release();
        }
    },
    delete: async (data) => {
        const client = await pool.connect();
        try {

        } catch (error) {

        } finally {
            client.release();
        }

    },
}

module.exports = Details;