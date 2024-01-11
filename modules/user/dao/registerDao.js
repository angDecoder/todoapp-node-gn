'use strict';

const logging = require('../../../logging');
const UserModel = require('../model/User');

const registerDao = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "REGISTERING USER", VALUES : values });
    try {
        const registerResponse = await UserModel.create(values);
        logging.log(apiReference,{ EVENT : "USER REGISTERED", VALUE :  registerResponse });

        return {
            success : true,
            data : {}
        }
    } catch (error) {
        logging.logError(apiReference,{ EVENT : "USER REGISTRATION FAILED", ERROR : error });
        if( error?.code === 11000 ){
            return { 
                success : false,
                error : "EMAIL ALREADY REGISTERED"
            }
        }
        return {
            success : false,
            error
        }
    }
}

module.exports = registerDao;