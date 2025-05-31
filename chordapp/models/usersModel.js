const client = require('../postgresDB')

const User = {
    create: async (first_name, last_name, email, creation_date, password, user_dob) => {
        console.log(`[INFO]: Creating user:  ${first_name}`)
        try {
            const role = "BASIC";
            const response = await client.query('INSERT INTO users (first_name, last_name, email, created_at, password, role ) VALUES ($1,$2,$3,$4,$5,$6) RETURNING "user_id"', [first_name, last_name, email, creation_date, password, role]);
            console.log("User Created: ", email)
            return response.rows[0]
        } catch (error) {
            console.log(error.message)
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
        try {
            const response = await client.query(query);
            if (response.rows.length === 0) {
                return false;
            } else {
                return response.rows;
            }
        } catch (error) {
            console.log("get all users ERROR :(", error.message);
            throw error;
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
        try {
            const response = await client.query(query, [user_id]);
            if (response.rows.length === 0) {
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("FindByID ERROR :(", error.message);
            throw error;
        }
    },
    findOne: async (email) => {
        console.log(`Searching for: ${email}`);
        try {
            const response = await client.query('SELECT * FROM users WHERE "email" = ($1)', [email]);
            if (response.rows.length == 0) {
                console.log("User not found.");
                return false;
            } else {
                return response.rows[0];
            }
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    },
    update: async (data) => {
        const { user_id, user_country, user_city, user_bio, user_dob } = data
        const dob = new Date(user_dob)
        user_dob = dob.toISOString().split('T')[0];
        console.log(`new updated DOB: ${user_dob}`)
        console.log("UPDATE::", data)
        try {
            console.log('Lets update this user...')
            const result = await client.query(`UPDATE user_details SET user_country =  $1, user_city = $2, user_bio = $3, user_dob = $4 WHERE info_id = $4 RETURNING info_id`, [user_country, user_city, user_bio, user_dob, user_id]);

            if (result.rowCount === 0) {
                console.log('No details updates recieved');
                return null;
            }
            return result.rows[0];
        } catch (error) {
            console.log("Error updating database:", error.message)
            throw error;
        }
    },
    delete: async (user_id) => {
        try {
            await client.query('DELETE FROM user_details WHERE "info_id" = ($1)', [user_id]);
            await client.query('DELETE FROM users WHERE "user_id" = ($1)', [user_id]);
            console.log(`User ${user_id} deleted.`);
            return true;
        } catch (error) {
            console.log("ERROR:", error.message);
            return false;
        }
    }
}

module.exports = User;