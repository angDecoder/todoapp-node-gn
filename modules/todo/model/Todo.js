const mongoose = require('mongoose');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 20,
        minLength : 1
    },
    description : {
        type : String,
        required : true,
        maxLength : 200
    },
    created_at : {
        type : Date,
        default : ()=> Date.now()
    },
    completed : {
        type : Boolean,
        default  : false
    },
    is_deleted : {
        type : Boolean,
        default : false
    },
    owner : {
        type : String,
        validate : {
            validator : (v)=> emailRegex.test(v),
            message : (m)=>`email format not correct for "${m}"`,
        },
        ref : 'user',
    }
});

module.exports = mongoose.model('todo',todoSchema);