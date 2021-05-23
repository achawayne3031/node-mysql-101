
    const validator = require('validator');
    const Joi = require('joi');
    const fs = require('fs');
    const Crypto = require('crypto');
    const Str = require('@supercharge/strings')
    const conn = require('../config/init');
    const database = require('../class/database');



    const validateData = (data) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(8),
            phone: Joi.number().required(),
        });
        return Joi.validate(data, schema);
    }

    const validateLoginData = (data) => {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return Joi.validate(data, schema);
    }

    const validateSetPassword = (data) => {
        const schema = Joi.object().keys({
            password: Joi.string().required().min(8),
            token: Joi.string().required()
        });
        return Joi.validate(data, schema);
    }


    readFileFunc = (filePath) => {
        fs.readFile(filePath, function(err, data){
            if(err){
                console.log(err.message);
            }else{
                return JSON.parse(data);
            }

        });
    }


    const writeFileFunc = (filePath, userData) => {
        let userFileData = readFileFunc(filePath);
        return userFileData;
    }


    function superChargeRandom(size = 20) {
        return random_WithFiftySymbols = Str.random(size) 
    }

   
   function generateRandom(size = 20){
    return Crypto
        .randomBytes(size)
        .toString('base64')
        .slice(0, size);
   }


   function startTimer(email, mins){
       let time = mins * 10000;
        setTimeout(() => {
            database.query("UPDATE `users` SET reset_password_token = '' WHERE email = '"+email+"'");
        }, time);
    }


    module.exports = {
        validateData: validateData,
        writeFileFunc: writeFileFunc,
        readFileFunc: readFileFunc,
        validateLoginData: validateLoginData,
        generateRandom: generateRandom,
        startTimer: startTimer,
        superChargeRandom: superChargeRandom,
        validateSetPassword: validateSetPassword
    };