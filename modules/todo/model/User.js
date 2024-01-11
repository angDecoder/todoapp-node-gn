const mongoose = require('mongoose');

const emailRegex = /i/;
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        validate : {
            validator : (v)=> emailRegex.test(v),
            message : (m)=>`email format not correct for "${m}"`,
        }
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
