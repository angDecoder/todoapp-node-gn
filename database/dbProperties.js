const mysql = {
    master : {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'todoapp'   
    }
}

const mongodb = {
    master : {
        uri : "mongodb://localhost:27017/todoapp"
    }
}

const selectedDB = "mongodb";

module.exports = {
    mysql,
    mongodb,
    selectedDB
}