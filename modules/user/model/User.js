const mongoose = require('mongoose');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        validate : {
            validator : (v)=> emailRegex.test(v),
            message : (m)=>`email format not correct for "${m}"`,
        },
        unique : true,
        index : true,
    },
    username : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('user',userSchema);
