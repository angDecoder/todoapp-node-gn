const logging = require('../../../logging');
const Todo = require('../model/Todo');

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
        
        const deleteItemResponse = await Todo.updateOne(
            { _id : `${values?.id}`, owner : values.owner },
            { $set : { is_deleted : true } });

        
        logging.log(apiReference,{ EVENT : "DELETING TODO SUCCESSFULL ", ID :  values.id });
        return {
            success: true,
            data: deleteItemResponse,
        }
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
        
        
        const updateItemResponse = await Todo.updateOne(
            { _id : `${values?.id}`,owner : values.owner },
            { $set : { completed : true } });
        
        logging.log(apiReference,{ EVENT : "UPDATING TODO SUCCESSFULL ", ID :  values.id });
        return {
            success: true,
            data: updateItemResponse,
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