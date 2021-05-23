

const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const util = require('util');
const database = require('../class/database');



var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database : process.env.DB_NAME
});


connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});



const updateQuery = (sql) => {
  connection.query(sql, (err, results, fields) => {
    if(err)
      return err

  });

}




async function insertQuery(sql){

  const mysqlPromise = require('mysql2/promise');

   var connection2 = await mysqlPromise.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database : process.env.DB_NAME
    });

    const [rows, fields] = await connection2.execute('SELECT * FROM `users`');
    console.log(rows);

    // return rows;

  //  try{
  //   const rows = await connection.connection.query(sql);
  //   return rows;
  // } catch (e) {
  //   // handle exception
  // } finally {
  //   //await db.close(connection);
  // }

  
  
  // connection.query(sql, (err, results, fields) => {
  //   if(err)
  //     return err;
  //   else
  //     console.log(results);
  // });



  // connection.query(sql, (err, results, fields) => {
  //   if(err)
  //     return err;
  
  //   else
  //     var id = results.insertId;
  //     var accessToken = setToken(id);
  //     var updateSql = "UPDATE users SET token = '"+accessToken+"' WHERE id = '"+id+"'";
  //     updateQuery(updateSql);
  //     var data = selectQuery(id);

  //     console.log(data);
  // });

}




var setToken = (id) => {
  var tokenValue = {id: id}
  var accessToken = jwt.sign(tokenValue, 'node_api', {algorithm: "HS256"});
  return accessToken;

}

const deleteQuery = (sql) => {
  connection.query(sql, (err, results, fields) => {
    if(err)
      return err;


  });
}

const selectQuery = (sql) => {
  connection.query(sql, (err, results, fields) => {
    if(err)
      return err;
    else
      return results;
    

  });
}




module.exports = {
  connection: connection,
  selectQuery: selectQuery,
  updateQuery: updateQuery,
  deleteQuery: deleteQuery,
  insertQuery: insertQuery,
  setToken: setToken,

}

