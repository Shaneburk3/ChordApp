const pool = require('../postgresDB')

const Admins = {
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
            console.log('Deleting these users as admin.');
            let deleted_user_ids = []
            await client.query('BEGIN');
            for (let i = 0; i < data.length; i++) {
                const details_result = await client.query(`DELETE FROM user_details WHERE "info_id" = $1 RETURNING "info_id"`, [data[i]]);
                const users_result = await client.query(`DELETE FROM users WHERE "user_id" = $1 RETURNING "user_id"`, [data[i]]);
                deleted_user_ids.push(users_result.rows[0])
                if (users_result.rowCount === 0 || details_result.rowCount === 0) {
                    await client.query('ROLLBACK');
                    console.log('Could not delete user.');
                    return null;
                }
            }
            await client.query('COMMIT');
            console.log(deleted_user_ids, " deleted")
            return deleted_user_ids;
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("Error updating database:", error.message)
            throw error;
        } finally {
            client.release();
        }
    },
    suspend: async (data) => {
        const client = await pool.connect();
        try {
            console.log('Suspending these users as admin.');
            await client.query('BEGIN');
            const user_status = "SUSPENDED"
            let suspend_result;
            for (let i = 0; i < data.length; i++) {
                suspend_result = await client.query(`UPDATE users SET status = $1 WHERE user_id = $2 RETURNING user_id`, [user_status, data[i]]);
                if (suspend_result.rowCount === 0) {
                    await client.query('ROLLBACK');
                    console.log('Could not suspend user.');
                    return null;
                }
            }
            await client.query('COMMIT');
            console.log(suspend_result, " suspended")
            return suspend_result.rows;
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("Error updating database:", error.message)
            throw error;
        } finally {
            client.release();
        }
    },
    unsuspend: async (data) => {
        const client = await pool.connect();
        try {
            console.log('unsuspending these users as admin.');
            await client.query('BEGIN');
            const user_status = "ACTIVE"
            let unsuspend_result;
            for (let i = 0; i < data.length; i++) {
                unsuspend_result = await client.query(`UPDATE users SET status = $1 WHERE user_id = $2 RETURNING user_id`, [user_status, data[i]]);
                if (unsuspend_result.rowCount === 0) {
                    await client.query('ROLLBACK');
                    console.log('Could not unsuspend user.');
                    return null;
                }
            }
            await client.query('COMMIT');
            console.log(unsuspend_result, " unsuspend")
            return unsuspend_result.rows;
        } catch (error) {
            await client.query('ROLLBACK');
            console.log("Error updating database:", error.message)
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = Admins;