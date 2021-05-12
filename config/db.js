
var mysql = require('mysql');

var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
});

conn.connect(function(err) {
    if(err)
        console.log("error, database connection failed");
    else
        console.log("Connected!");
});


module.exports = conn;


