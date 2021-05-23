
const database = require('../class/database');

function verifyPasswordToken(req, res, next) {

    var token = req.params.token;

    database.query("SELECT * FROM `users` WHERE reset_password_token ='"+token+"'").then(
        result => { 
            var isEmpty = Object.keys(result).length;
            if(isEmpty == 0){
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: "Unauthorized User"
                });
            }else{
                next();
            }
        },
        err => {
            res.status(404).json({
                success: false,
                status: 404,
                message: "Error Occured, Try Again Later"
            });
        }
    );

   
}


module.exports = verifyPasswordToken;