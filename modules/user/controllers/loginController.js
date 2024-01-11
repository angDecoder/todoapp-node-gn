'use strict';

const loginService = require('../services/loginServices');
const responses = require('../../../responses/responses');
const logging = require('../../../logging');

const loginController = async(req,res)=>{
    const apiReference = req.apiReference;
    const reqBody = {...req.body};

    try{
        const response = await loginService(apiReference, reqBody);
        logging.log(apiReference, { finalResponse: response });

        if(response.success){
            return responses.success(res, response.data);
        }

        return responses.failure(res, response.data || {}, response.error);
    }
    catch(error){
        console.log(error);
    } 
}

module.exports = loginController;