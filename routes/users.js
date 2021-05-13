
const conn = require('../config/db');
const fs = require('fs');
const express = require('express');
const { validateData, readFileFunc, writeFileFunc } = require('../func/func_helper');
const json_encode = require('json_encode');
const passwordHash = require('password-hash');

const router = express.Router();


router.post('/login', (req, res) => {

    const { error } = validateData(req.body);
    if(error){
        res.status(404).json({
            success: false,
            status: 404,
            message: error.message
        });
        return;
    }
});



router.get('/all', (req, res) => {



    const users = fs.readFile('public/database/users.json',(err, data) => {


    const obj = JSON.parse(json);

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

    var encoded = json_encode(data);
    writeFileFunc('public/database/users.json', encoded);


});






module.exports = router;