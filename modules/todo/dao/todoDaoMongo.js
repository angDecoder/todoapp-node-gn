const logging = require('../../../logging');
const Todo = require('../model/Todo');
const mongoose = require('mongoose');

const createItem = async (apiReference, values) => {
    try {
        const createItemResponse = await Todo.create(values);
        logging.log(apiReference, { EVENT: "TODO ITEM CREATED" });
        return {
            success: true,
            data: createItemResponse,
        }
    } catch (error) {
        logging.logError(apiReference, { EVENT: "TODO ITEM NOT CREATED", ERROR: error });
        return {
            success: false,
            error
        }
    }
}

const getList = async (apiReference, values) => {
    try {
        const getListResponse = await Todo.find({ is_deleted: false, owner : values.owner })
            .sort({ created_at: 1 })
            .limit(values?.limit || 1000)
            .skip(values?.skip || 0);

            console.log('here', values);
        

        return {
            success: true,
            data: getListResponse,
        }
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}

const deleteItem = async (apiReference,values) => {
    try {
        
        console.log(values);
        const deleteItemResponse = await Todo.updateOne(
            { _id : `${values?.id}`, owner : values.owner },
            { $set : { is_deleted : true } });

        
        if( deleteItemResponse?.matchedCount===1 ){
            logging.log(apiReference,{ EVENT : "DELETING TODO SUCCESSFULL ", RESPONSE : deleteItemResponse });
            return {
                success: true,
                data: deleteItemResponse,
            }

        }

        logging.logError(apiReference,{EVENT : "DELETING TODO ERROR", ERROR : "INVALID TODO ID OR YOU DON'T OWN THE TODO ITEM",});
        return {
            success : false,
            error : {
                message : "INVALID TODO ID OR YOU DON'T OWN THE TODO ITEM"
            }
        }
        // throw new Error("");
    } catch (error) {
        logging.logError(apiReference,{ EVENT : "DELETING TODO FAILED ", ERROR : error });

        return {
            success: false,
            error
        }
    }
}

const updateItem = async (apiReference,values) => {
    try {
        
        console.log(values);
        const updateItemResponse = await Todo.updateOne(
            { _id : `${values?.id}` ,owner : values?.owner },
            [{ $set : { completed : { $ne : ["$completed",true] } } }]
        );
        
        if( updateItemResponse?.modifiedCount===1 && updateItemResponse?.matchedCount===1 ){
            logging.log(apiReference,{ EVENT : "UPDATING TODO SUCCESSFULL ", RESPONSE : updateItemResponse });
            return {
                success: true,
                data: updateItemResponse,
            }
        }

        logging.logError(apiReference,{ EVENT : "UPDATING TODO FAILED", ERROR : "INVALID TODO ID OR YOU DON'T OWN THE TODO ITEM"})
        return { 
            success : false,
            error : "INVALID TODO ID OR YOU DON'T OWN THE TODO ITEM"
        }

    } catch (error) {
        logging.logError(apiReference,{ EVENT : "UPDATING TODO FAILED ", ERROR : error });

        return {
            success: false,
            error
        }
    }
}


module.exports = {
    createItem,
    getList,
    deleteItem,
    updateItem
}