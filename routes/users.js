
const fs = require('fs');
const express = require('express');
const { validateData, readFileFunc, writeFileFunc, 
    validateLoginData, generateRandom, startTimer, 
    superChargeRandom, validateSetPassword } = require('../func/func_helper');

const json_encode = require('json_encode');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
const decode = require('json-decode');
const test = require('../class/test');
const database = require('../class/database');
const userAuth = require('../middleware/user-auth');
const mailer = require('../class/mailer');
const verifyPasswordToken = require('../middleware/user-reset-password');



const router = express.Router();

router.post('/login', (req, res) => {
    const { error } = validateLoginData(req.body);
    if(error){
        res.status(404).json({
            success: false,
            status: 404,
            message: error.message
        });
    }

    database.query("SELECT * FROM users WHERE email ='"+req.body.email+"'").then(
        result => { 
            var isEmpty = Object.keys(result).length;
            if(isEmpty == 0){
                res.status(404).json({
                    success: false,
                    status: 404,
                    data: "Email Not registered"
                }); 

            }else{
                dbPassword = result[0].password;
                id = result[0].id;
                var verify = passwordHash.verify(req.body.password, dbPassword);
                if(verify){
                    var accessToken = database.setToken(id);
                    var updateSql = "UPDATE users SET token = '"+accessToken+"' WHERE id = '"+id+"'";
                    database.query(updateSql).then(
                        result => {
                            database.query("SELECT * FROM `users` WHERE id ="+ id).then(
                                result => {
                                    res.status(200).json({
                                        success: true,
                                        status: 200,
                                        data: result
                                    });
                                }
                            )

                        }
                    )

                    // res.status(200).json({
                    //     success: true,
                    //     status: 200,
                    //     data: result
                    // });  
                }else{
                    res.status(404).json({
                        success: false,
                        status: 404,
                        data: "Incorrect credentials"
                    });  
                }
            }
        }
    );
    
});


router.post('/logout', (req, res) => {


});



router.get('/reset-password/:token', verifyPasswordToken, (req, res) => {

   console.log("we rea in");

});


router.post('/set-password', (req, res) => {
    const { error } = validateSetPassword(req.body);
    if(error)
        res.status(404).json({
            success: false,
            status: 404,
            message: error.message
        });
    else
        var token = req.body.token;
        var password = passwordHash.generate(req.body.password);
        database.query("UPDATE `users` SET `password` = '"+password+"' WHERE `reset_password_token` = '"+token+"'").then(
            result => {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: result
                });

            },
            err => {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: "Token Has Expired"
                });

            }
        );
        

});




router.post('/forgot-password', (req, res) =>{
    var email = req.body.email;
    let token = superChargeRandom();
    let url = "https://node-mysql/users/reset-password/"+token;

    database.query("SELECT * FROM users WHERE email ='"+email+"'").then(
        result => { 
            var isEmpty = Object.keys(result).length;
            if(!isEmpty == 0){
                database.query("UPDATE `users` SET reset_password_token = '"+token+"' WHERE email = '"+email+"'");
           
                mailer.sendMail(url, email).then(
                    result => {
                       startTimer(email, 20);
                        res.status(200).json({
                            success: true,
                            status: 200,
                            data: result
                        });  
                    },
                    err => {
                        res.status(200).json({
                            success: false,
                            status: 404,
                            data: err
                        });  
                    }
                );
            
            }
        },
        err => {
            res.status(404).json({
                success: false,
                status: 404,
                message: error.message
            });
        }
    );


});


router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var phone = req.body.phone;

    const { error } = validateData(req.body);
    if(error){
        res.status(404).json({
            success: false,
            status: 404,
            message: error.message
        });
        return;
    }

    let hashedPassword = passwordHash.generate(password);
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone
    };

    var sql = "SELECT * FROM users WHERE email = '"+data.email+"'";
    database.query(sql).then(
        result => {
            var isEmpty = Object.keys(result).length;
            if(isEmpty == 0){
                var insertSql = "INSERT INTO users (name, email, password, phone) VALUES ('"+data.name+ "', '"+data.email+"', '"+data.password+"', '"+data.phone+"')";
                database.query(insertSql).then(
                    result => {
                        var id = result.insertId;
                        var accessToken = database.setToken(id);
                        var updateSql = "UPDATE users SET token = '"+accessToken+"' WHERE id = '"+id+"'";
                        database.query(updateSql).then(
                            result => {

                                database.query("SELECT * FROM `users` WHERE id ="+ id).then(
                                    result => {
                                        res.status(200).json({
                                            success: true,
                                            status: 200,
                                            data: result
                                        });
                                    }
                                )

                            }
                        )

                    }
                );
               
            }else{
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: "Email Has already been registered"
                });
            }
        }
    );
});





module.exports = router;