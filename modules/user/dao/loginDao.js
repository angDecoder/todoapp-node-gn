'use strict';

const logging = require('../../../logging');
const UserModel = require('../model/User');

const loginDao = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "LOGGING IN USER", VALUES : values });

    try {
        const user = await UserModel.findOne({ email : values.email });
        if( !user )
            return {
                success : false,
                error : "user not found",
            }

        return {
            success : true,
            data : user._doc
        }
    } catch (error) {
        return {
            success : false,
            error,
        }
    }
}

module.exports = loginDao;