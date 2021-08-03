const mysql = require("mysql2");
const config = require("../config.js");

function run_query(query, callback) {
  var conn = mysql.createConnection(config.dbConfig);
  conn.query(query, callback);
}

module.exports = { run_query };
