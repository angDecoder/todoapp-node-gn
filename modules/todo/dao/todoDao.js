const dbHandler = require('../../../database/mysqllib');
const logging = require('../../../logging');

const createItem = async (apiReference, values) => {
    const query = `
        INSERT INTO todolist(TITLE,DESCRIPTION,OWNER) 
        VALUES(?,?,?);
    `;

    const val = [values?.title, values?.description, values?.owner];

    let queryResponse = await dbHandler.executeQuery(apiReference, 'createItem', query, val);
    logging.log(apiReference, { EVENT: 'todo create item', RESPONSE: queryResponse });

    if (queryResponse.ERROR)
        return { success: false };

    return {
        success: true,
        data: queryResponse
    }
}

const getList = async (apiReference, values) => {
    const query = `
        select * from todolist
        order by created_at 
        ${values.limit ? 'limit ?' : ''}
        ${values.skip ? 'offset ?' : ''}
    `;

    

    let val = [values?.limit || 0, values?.skip || 0];
    let queryResponse = await dbHandler.executeQuery(apiReference, 'getList', query, val);

    if (queryResponse.ERROR)
        return { success: false };

    return {
        success: true,
        data: queryResponse[0]
    }
}

const updateItem = async (apiReference, values) => {
    const query = `
        update todolist
        set completed = !completed
        where id = ?
    `;

    let val = [values?.id];
    let queryResponse = await dbHandler.executeQuery(apiReference, 'updateItem', query, val);

    if (queryResponse.ERROR)
        return { success: false };

    return {
        success: true,
        data: queryResponse
    }
}

const deleteItem = async (apiReference, values) => {

    const query = `
        delete from todolist
        where id = ?
    `;

    const val = [values.id];
    let queryResponse = await dbHandler.executeQuery(apiReference, 'deleteItem', query, val);

    if (queryResponse.ERROR)
        return { success: false };

    return {
        success: true,
        data: queryResponse
    }
}

module.exports = {
    createItem,
    getList,
    updateItem,
    deleteItem
}