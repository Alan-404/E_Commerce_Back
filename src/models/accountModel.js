const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const accountModel = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref : 'users'
    }
})

module.exports = mongoose.model('accounts', accountModel);

