const accountModel = require('../models/accountModel');
const userModel = require('../models/userModel');
const accountController = require('./accountController');


class userController {
    

    //
    insertUser = async (req, res) => {

        const {firstName,middleName, lastName ,gender, bDate, phone, address, email, password} = req.body;
        
        if (!firstName || ! lastName)
            return res.status(400).json({success: false, message: 'Missing your name'});
        
        try 
        {
            const existedMail = await accountModel.findOne({email});

            if (existedMail)
                return res.status(400).json({success: false, message: 'Email has been token'});
            
            const user = new userModel({firstName,middleName, lastName, gender, bDate, phone, address});

            await user.save();

            const userId = user._id;

            const accessToken = await accountController.insertAccount(email, password, userId);
            
            return res.json({success: true, message: 'Create user successfully', accessToken});

        }
        catch (err)
        {
            return res.status(500).json({success: false, message: 'Error internal server'});
        }
    }

    updateUser = async (req, res) => {
        const {fName, lName , gender, bDate, phone, address} =req.body;
        try 
        {
            const account = await accountModel.findById(req.accountId).select('-password');
            

            await userModel.findOneAndUpdate(account.userId, {fName, lName, gender, bDate, phone, address});

            return res.json({success: true, message: 'Update user successfully'});
        }
        catch (err)
        {
            return res.json({success: false, message: err.message});
        }
    }

}

module.exports = new userController;