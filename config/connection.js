import mysql from "mysql2/promise"

let connection;

connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "testdb",
});

export default connection;