'use strict';

const logging = require('../../../logging');
const todoDao = require('../dao/todoDao');
const todoDaoMongo = require('../dao/todoDaoMongo');
const dbProperties = require('../../../database/dbProperties');

const selectedDB = dbProperties.selectedDB;

const createItem = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "CREATING TODO ITEM", ITEM : values });

    
    let createItem =  selectedDB==='mysql' ? 
    await todoDao.createItem(apiReference,values) : 
    await todoDaoMongo.createItem(apiReference,values);

    logging.log(apiReference,{ EVENT : "TODO ITEM CREATED", RESPONSE : createItem });


    if( !createItem.success )
        return { success : false };

    return {
        success : true,
        message : "TODO CREATED SUCCESSFULLY"
    }
    
}

const getList = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "FETCHING TODO LIST" });

    let getListResponse = selectedDB==='mysql' ? 
    await todoDao.getList(apiReference,values) : 
    await todoDaoMongo.getList(apiReference,values);

    if( !getListResponse.success )
        return { success : false };

    return {
        success : true,
        message : "TODO LIST FETCHED SUCCESSFULLY",
        data :  getListResponse.data
    }
}

const updateItem = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "COMEPLETE TASK ", VALUES : values});

    let updateItemResponse = selectedDB==='mysql' ? 
    await todoDao.updateItem(apiReference,values) : 
    await todoDaoMongo.updateItem(apiReference,values);

    if( !updateItemResponse.success )
        return { success : false };

    return {
        success : true,
        message : "TODO UPDATED SUCCESSFULLY"
    }
}

const deleteItem = async(apiReference,values)=>{
    logging.log(apiReference,{ EVENT : "DELETING ITEM", VALUES : values});

    let deleteItemResponse = selectedDB==='mysql' ? 
    await todoDao.deleteItem(apiReference,values) : 
    await todoDaoMongo.deleteItem(apiReference,values);

    if( !deleteItemResponse.success )
        return { success : false };

    return {
        success : true,
        message : "ITEM DELETE SUCCESSFULLY"
    }
}


module.exports = {
    createItem,
    getList,
    updateItem,
    deleteItem,
}
