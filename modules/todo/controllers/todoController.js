
const { isNumber } = require('underscore');
const responses = require('../../../responses/responses');
const todoService = require('../services/todoServices');
const dbProperties = require('../../../database/dbProperties');

const selectedDB = dbProperties.selectedDB;

const createItem = async(req,res)=>{
    const values = req.body;
    const apiReference = req.apiReference;

    try {
        const response = await todoService.createItem(apiReference, values);
        if(response.success){
            return responses.success(res, response.data, response.message);
        }
            return responses.failure(res, response.error);
    } catch (error) {
        console.log(error);
    }
}

const getList = async(req,res)=>{
    let values = { };
    // console.log(req.query,req.params);

    if( req?.query?.limit )
        values = { ...values, limit : parseInt(req?.query?.limit || 1000)}

    if( req?.query?.skip )
        values = { ...values, skip : parseInt(req?.query?.skip || 0)}
    const apiReference = req.apiReference;

    try {
        const response = await todoService.getList(apiReference, values);
        if(response.success){
            return responses.success(res, response.data, response.message);
        }
            return responses.failure(res, response.error);
    } catch (error) {
        console.log(error);
    }
}

const updateItem = async(req,res)=>{
    const values = { id : req?.params?.id };
    if( selectedDB==='mysql' )
        values.id = parseInt(req?.params?.id)
    const apiReference = req.apiReference;


    // console.log("here val",values);

    try {
        const response = await todoService.updateItem(apiReference, values);
        if(response.success){
            return responses.success(res, response.data, response.message);
        }
            return responses.failure(res, response.error);
    } catch (error) {
        console.log(error);
    }
}

const deleteItem = async(req,res)=>{
    const values = { id : req?.params?.id };
    if( selectedDB==='mysql' )
        values.id = parseInt(req?.params?.id);    
    const apiReference = req.apiReference;

    try {
        const response = await todoService.deleteItem(apiReference, values);
        if(response.success){
            return responses.success(res, response.data, response.message);
        }
            return responses.failure(res, response.error);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createItem,
    getList,
    updateItem,
    deleteItem
}