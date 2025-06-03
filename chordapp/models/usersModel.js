const pool = require('../postgresDB')


//DATABASE Transaction = BEGIN / COMMIT / ROLLBACK / RELEASE
const User = {
    create: async (first_name, last_name, email, creation_date, password, user_dob) => {
        console.log(`[INFO]: Creating user: ${first_name}`);
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const role = "BASIC";
            const userBio = "Edit this page!";
            const userCity = "City";
            const userCountry = "Country"

            const response = await client.query(
                `INSERT INTO users (first_name, last_name, email, created_at, password, role)
                 VALUES ($1,$2,$3,$4,$5,$6)
                 RETURNING user_id`,
                [first_name, last_name, email, creation_date, password, role]
            );

            const user_id = response.rows[0].user_id;

            await client.query(
                `INSERT INTO user_details (info_id, user_bio, user_city, user_country, user_dob)
                 VALUES ($1, $2, $3, $4, $5)`,
                [user_id, userBio, userCity, userCountry, user_dob]
            );

            await client.query('COMMIT');
            console.log("User + details created for user ID:", user_id);

            return { user_id };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("[ERROR]: Failed to create user:", error.message);
            return null;
        } finally {
            client.release();
        }
    },
    getAllUsers: async () => {
        const query = `SELECT 
        users.user_id,
        users.first_name,
        users.last_name, 
        users.email, 
        users.created_at, 
        users.role,
        user_details.user_dob 
        FROM users JOIN user_details ON users.user_id = user_details.info_id ORDER BY user_id ASC`;
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const response = await client.query(query);
            if (response.rows.length === 0) {
                await client.query('ROLLBACK');
                return false;
            } else {
                await client.query('COMMIT');
                return response.rows;
            }
        } catch (error) {
            console.log("get all users ERROR :(", error.message);
            throw error;
        } finally {
            client.release();
        }
    },
    findById: async (user_id) => {
        console.log(`findByID: ${user_id}`);
        const query = `SELECT 
        users.user_id,
        users.first_name,
        users.last_name, 
        users.email, 
        users.created_at, 
        users.role,
        user_details.user_dob, 
        user_details.user_bio, 
        user_details.user_city, 
        user_details.user_country 
        FROM users JOIN user_details ON users.user_id = user_details.info_id WHERE users.user_id = ($1)`;
        const client = await pool.connect();
        try {
            //await client.query('BEGIN');
            const response = await client.query(query, [user_id]);
            if (response.rows.length === 0) {
                //await client.query('ROLLBACK');
                return false;
            } else {
                //await client.query('COMMIT');
                return response.rows[0];
            }
        } catch (error) {
            console.log("FindByID ERROR :(", error.message);
            throw error;
        } finally {
            client.release();
        }
    },
    findOne: async (email) => {
        console.log(`Searching for: ${email}`);
        const client = await pool.connect();
        try {
            //await client.query('BEGIN');
            const response = await client.query('SELECT * FROM users WHERE "email" = ($1)', [email]);
            if (response.rows.length == 0) {
                //await client.query('ROLLBACK');
                console.log("User not found.");
                return false;
            } else {
                //await client.query('COMMIT');
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        } finally {
            client.release();
        }
    },
    update: async (data) => {
        const { user_id, user_country, user_city, user_bio, user_dob } = data
        const dob = new Date(user_dob)
        user_dob = dob.toISOString().split('T')[0];
        console.log(`new updated DOB: ${user_dob}`)
        console.log("UPDATE::", data)
        const client = await pool.connect();
        try {
            console.log('Lets update this user...');
            await client.query('BEGIN');
            const result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3, user_dob = $4 WHERE info_id = $5 RETURNING info_id`, [user_country, user_city, user_bio, user_dob, user_id]);

            if (result.rowCount === 0) {
                await client.query('ROLLBACK');
                console.log('No details updates recieved');
                return null;
            }
            await client.query('COMMIT');
            return result.rows[0];
        } catch (error) {
            console.log("Error updating database:", error.message)
            throw error;
        } finally {
            client.release();
        }
    },
    delete: async (user_id) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query('DELETE FROM user_details WHERE "info_id" = ($1)', [user_id]);
            await client.query('DELETE FROM users WHERE "user_id" = ($1)', [user_id]);
            console.log(`User ${user_id} deleted.`);
            await client.query('COMMIT');
            return true;
        } catch (error) {
            console.log("ERROR:", error.message);
            await client.query('ROLLBACK');
            return false;
        }
    }
}

module.exports = User;