const pool = require('../postgresDB')


const Logs = {
    create: async (data) => {
        console.log(`Creating log with ${data}`)
        const client = await pool.connect();
        const { user_id, event_type, event_message, endpoint } = data
        console.log("LOG::", data)
        try {
            await client.query('BEGIN');
            await client.query("INSERT INTO logs (user_id, event_type, event_message, endpoint) VALUES ($1,$2,$3,$4) ", [user_id, event_type, event_message, endpoint]);
            console.log("Log created for user: ", event_type);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            console.log(error.message)
        } finally {
            client.release()
        }
    },
    findByID: async (data) => {
        console.log(`Finding log by user ID: ${data}`)

    },
    findByEvent: async (data) => {
        console.log(`Finding logs by event: ${data}`)

    },
    getAllLogs: async (req, res) => {
        console.log("Getting all Logs.")
        const client = await pool.connect();

        try {
            const response = await client.query("SELECT * FROM logs ORDER BY created_at DESC");
            if (response.rows.length == 0) {
                return false;
            } else {
                return response.rows;
            }
        } catch (error) {
            console.log("GetAllLogs ERROR:", error.message);
            return false;
        } finally {
            client.release();
        }
    }
}

module.exports = Logs;