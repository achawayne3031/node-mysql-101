
const env = require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const passwordHash = require('password-hash');
const validator = require('validator');
const dbConnect = require('./config/init');
const users = require('./routes/users');
//const cors = require('./middleware/cors');

const cors = require('cors')
 

var app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());;



//app.use('./middleware/cors', cors);
app.use('/api/users', users);




process.on('uncaughtException', function(err) {
    console.log(err);
});

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`server on port ${port}`);


if (process.env.ERROR) {
    console.log(process.env.ERROR);
  }
  
