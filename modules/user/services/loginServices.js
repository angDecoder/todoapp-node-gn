'use strict';

const loginDao = require('../dao/loginDao');
const jwtServices = require('../../../services/jwtServices');
const bcrypt = require('bcrypt');

const loginServices = async (apiReference,values)=>{
    const loginResponse = await loginDao(apiReference,values);
    const accessToken = jwtServices.createJWT(apiReference,{email : values.email},"10 days");

    if( !loginResponse.success )
        return loginResponse

    const matched = await bcrypt.compare(values.password,loginResponse.data.password);

    if( !matched ){
        return {
            success : false,
            error : "PASSWORD DID NOT MATCH",  
        }
    }

    // console.log(loginResponse);

    loginResponse.data = {...loginResponse.data, accessToken};
    const {password,__v,...finalResponse} = loginResponse.data;

    // console.log('here',finalResponse)
    return {
        success : true,
        data : finalResponse
    }
}

module.exports = loginServices;