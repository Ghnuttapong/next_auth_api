const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_SERVER || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "next_auth",
  password: process.env.DB_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// debug

module.exports = connection;
