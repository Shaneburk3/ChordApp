const pool = require('../postgresDB')

const Admins = {
    create: async (user_id, user_dob) => {

    },
    findById: async (user_id) => {
        const client = await pool.connect();
    },
    update: async (data) => {

        const { user_id, user_country, user_city, user_bio, user_email, user_role, user_status } = data
        console.log("UPDATE::", data)
        const client = await pool.connect();
        //users: first_name, last_name, email, role, status
        //details: user_bio, user_city, user_country, user_dob
        try {
            console.log('Update this user as admin.');
            await client.query('BEGIN');
            const details_result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3 WHERE info_id = $4 RETURNING info_id`, [user_country, user_city, user_bio, user_id]);
            if (details_result.rowCount === 0) {
                await client.query('ROLLBACK');
                console.log('No updates recieved');
                return null;
            }
            const users_result = await client.query(`UPDATE users SET email =  $1, role = $2, status = $3 WHERE user_id = $4 RETURNING user_id`, [user_email, user_role, user_status, user_id]);
            if (users_result.rowCount === 0) {
                await client.query('ROLLBACK');
                console.log('No updates recieved');
                return null;
            }
            await client.query('COMMIT');
            return users_result.rows[0];
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

module.exports = Admins;