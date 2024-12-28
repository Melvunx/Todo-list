const mysql = require("mysql2");

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE } =
  process.env;

const databaseOption = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE,
};

const db = mysql.createConnection(databaseOption);

module.exports = db;
