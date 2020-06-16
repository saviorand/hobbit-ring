const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.DATABASE_URL,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
})
module.exports = {
  query: (text, params) => pool.query(text, params),
}