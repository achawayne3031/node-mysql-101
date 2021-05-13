
    const validator = require('validator');
    const Joi = require('joi');
    const fs = require('fs');


    const validateData = (data) => {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            phone: Joi.number().required(),
        });

        return Joi.validate(data, schema);
    }


    const readFileFunc = (filePath) => {
        fs.readFile(filePath, (err, data) => {

            if(err)
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: error.message
                });
            else
                res.status(200).json({
                    success: true,
                    status: 200,
                    data: JSON.parse(data)
                });
        });

    }


    const writeFileFunc = (filePath, data) => {
        fs.writeFile(filePath, data, (err, data) => {
            if(err)
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: error.message
                });
            else
                res.status(200).json({
                    success: true,
                    status: 200,
                    data: data
                });
        });
    }


   
    const responseFunc = () => {

    }





    module.exports = {
        validateData: validateData,
        writeFileFunc: writeFileFunc,
        readFileFunc: readFileFunc
    };

    // module.exports.validateData = validateData;