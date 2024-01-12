'use strict';
const logging = require('../../../logging');
const registerDao = require('../dao/registerDao');
const bcrypt = require('bcrypt');

const registerServices = async(apiReference,values)=>{

    values.password = await bcrypt.hash(values.password,10);
    const registerResponse = await registerDao(apiReference,values);
    logging.log(apiReference,{ EVENT : 'REGISTER RESPONSE FETCHED', REGISTER_RESPONSE : registerResponse });

    if( !registerResponse )
        return { success : false };

    return registerResponse;
}

module.exports = registerServices;