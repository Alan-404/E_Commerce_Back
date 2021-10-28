const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref : 'categories'
    }
})

module.exports = mongoose.model('products', productSchema);