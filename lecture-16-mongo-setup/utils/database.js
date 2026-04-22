const mysql = require("mysql2");

// connection pool (IMPORTANT for production)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Start@123",
  database: "db_airbnb",
});

module.exports = pool.promise();
