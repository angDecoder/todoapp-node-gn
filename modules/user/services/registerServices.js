'use strict';
const logging = require('../../../logging');
const registerDao = require('../dao/registerDao');

const registerServices = async(apiReference,values)=>{
    const registerResponse = await registerDao(apiReference,values);

    if( !registerResponse )
        return { success : false };

    return registerResponse;
}

module.exports = registerServices;