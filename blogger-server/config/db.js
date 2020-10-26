const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogger',
  password: '0000',
  post: 5432
})

module.exports = pool
