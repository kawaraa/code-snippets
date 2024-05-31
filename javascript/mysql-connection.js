const mysql = require("mysql");
const { promisify } = require("util");

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const execQuery = promisify(db.query.bind(db));

module.exports = execQuery;

const mysql = require("mysql");
const { DB_HOST, DB_PORT, DB_USER, DB_PASS } = process.env;
const connection = mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS });
connection.connect();
connection.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results[0].solution);
});
connection.end();
