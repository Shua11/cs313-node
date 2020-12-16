const { Pool } = require('pg')

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: ''
})
const query = 'SELECT * FROM ___ WHERE id > $1'
const userInput = 42

pool.query(query, [userInput], (error, dbResponse) => {
    console.log(dbResponse.rows)
})

pool.end();