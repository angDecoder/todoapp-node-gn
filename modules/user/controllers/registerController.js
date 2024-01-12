'use strict';
const logging = require('../../../logging');
const responses = require('../../../responses/responses');
const constants = require('../../../responses/responseConstants');
const registerServices = require('../services/registerServices');

const registerController = async(req,res)=>{
    const apiReference = req.apiReference;
    const reqBody = {...req.body};

    
    try {
        const response = await registerServices(apiReference,reqBody);
        logging.log(apiReference, { serviceResponse: response});
        
        
        if(response.success){
            return responses.success(res, response.data, constants.responseMessages.REGISTER_SUCCESS);
        }
        return responses.failure(res, {}, response.error);
    }
    catch(error){
        console.log(error);
    }
}

module.exports = registerController;