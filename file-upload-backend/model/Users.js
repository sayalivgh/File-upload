const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    } ,
    lname: {
        type: String,
        required: true
    }  ,
    email: {
        type: String,
        required: true
    } ,
    password: {
        type: String,
        required: true
    },
   refreshToken: String 
});

module.exports = mongoose.model('User', usersSchema);