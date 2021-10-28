const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bDate: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    }
})

module.exports = mongoose.model('users', userModel);