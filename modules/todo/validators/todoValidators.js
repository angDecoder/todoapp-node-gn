'use strict';
const joi = require('joi');
const constants = require('../../../responses/responseConstants');
const validators = require('../../../validators/joiValidators');

const apiReferenceModule = constants.modules.TODO;

const createItem = async(req,res,next)=>{

    req.apiReference = {
        module : apiReferenceModule,
        api : 'createItem',
    };

    const schema = joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
    });

    let reqBody = { ... req.body };
    let request = { ... req };

    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);

    if( validFields )
        next();
}

const getList = async(req,res,next)=>{
    req.apiReference = {
        module : apiReferenceModule,
        api : "getList",
    }

    const schema = joi.object({
        limit : joi.number().optional(),
        skip : joi.number().optional(),
    });

    let reqBody = { ... req.query };
    let request = { ... req };
    
    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);

    if( validFields )
        next();
}

const updateItem = async(req,res,next)=>{
    req.apiReference = {
        module : apiReferenceModule,
        api : "updateItem",
    }

    const schema = joi.object({
        id : joi.number().required(),
    });

    let reqBody = { id : parseInt(req?.params?.id) };
    let request = { ... req };

    console.log("here first", reqBody );
    
    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    // console.log(validFields);
    if( validFields )
        next();
}

const deleteItem = async(req,res,next)=>{
    req.apiReference = {
        module : apiReferenceModule,
        api : "deleteItem",
    }

    const schema = joi.object({
        id : joi.number().required(),
    });

    let reqBody = { id : parseInt(req?.params?.id) };
    let request = { ... req };
    
    let validFields = await validators.validateFields(req.apiReference, request, reqBody, res, schema);
    // console.log(validFields);
    if( validFields )
        next();
}

module.exports = {
    createItem,
    getList,
    updateItem,
    deleteItem
}