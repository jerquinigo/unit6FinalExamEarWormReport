const pgp = require('pg-promise')({});
const db = pgp(process.env.DATABASE_URL || 'postgres://localhost:5432/earworm_report')


module.exports = { db }
