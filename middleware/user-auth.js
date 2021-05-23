
const jwt = require('jsonwebtoken');


function userTokenAuth(req, res, next) {
    
    if(req.body.token){
        jwt.verify(req.body.token, process.env.APP_jwt, (err, decode) => {
            if(err){
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: err
                });

            }else{
                next();
            }
        });
    }else{
        res.status(404).json({
            success: false,
            status: 404,
            message: "Unauthorized User"
        });
    }

  
}


module.exports = userTokenAuth;