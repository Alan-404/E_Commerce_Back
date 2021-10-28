const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advertisementSchema = new Schema({
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('advertisement', advertisementSchema);