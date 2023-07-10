// connect to database
const mysql = require('mysql2');

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cricbuzz'
});

module.exports = db