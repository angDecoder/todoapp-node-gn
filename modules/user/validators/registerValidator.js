'use strict';

const joi = require('joi');
const validators = require('../../../validators/joiValidators');

const constants=require('../../../responses/responseConstants');
const apiReferenceModule = constants.modules.REGISTER;


const registerValidator = async(req,res,next)=>{
    req.apiReference = {
        module : apiReferenceModule,
        api : 'register',
    }

    let schema = joi.object({
        email : joi.string().email().required(),
        username : joi.string().required(),
        password : joi.string().required(),
    });

    const reqBody = {...req.body};
    const request = {...req};

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    if(validFields){
        next();
    }
}

module.exports = registerValidator
