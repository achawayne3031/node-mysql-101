const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const mysqlPromise = require('mysql2/promise');


class Database{

    constructor() {  
        this.connectAsync();
    }

   async connectAsync(){
        this.connection = await mysqlPromise.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database : process.env.DB_NAME
          });
    }


   


    checkEmail(email){
        var selectSql = "SELECT * FROM users WHERE email = '"+email+"'";
        var results = this.selectQuery(selectSql);
        if(results){
            var isEmpty = Object.keys(results).length;
            if(isEmpty == 0){
                return false;
            }else{
                return true;
            }
        }        
    }

  

    setToken = (id) => {
        var tokenValue = {id: id}
        var accessToken = jwt.sign(tokenValue, process.env.APP_JWT, {algorithm: "HS256"});
        return accessToken;    
    }

        
    async query(sql){
        const [rows, fields] = await this.connection.execute(sql);
        return rows;
    }


}


const database = new Database();
module.exports = database;
