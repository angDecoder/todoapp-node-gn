'use strict';

const joi = require('joi');
const validators = require('../../../validators/joiValidators');

const constants=require('../../../responses/responseConstants');
const apiReferenceModule = constants.modules.LOGIN;


const loginValidator = async(req,res,next)=>{
    req.apiReference = {
        module : apiReferenceModule,
        api : 'login',
    }

    let schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required(),
    });

    const reqBody = {...req.body};
    const request = {...req};

    console.log(reqBody);

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

module.exports = loginValidator;