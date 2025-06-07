const client = require("../postgresDB");

const Logs = {
    create: async (data) => {
        console.log(`Creating log with ${data}`)

    },
    findByID: async (data) => {
        console.log(`Finding log by user ID: ${data}`)

    },
    findByEvent: async (data) => {
        console.log(`Finding logs by event: ${data}`)

    }
}

module.exports = Logs;