const mongoose = require('mongoose');

const connectDB = async () => {
    try 
    {
        await mongoose.connect('mongodb://localhost:27017/E_Commerce');
        console.log("Connected to Database");
    }
    catch(err)
    {
        console.log("Error: " + err.message);
    }
}  


module.exports = {connectDB};
