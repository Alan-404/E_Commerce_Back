const accountModel = require('../models/accountModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

class accountController {

    //
    checkMail = async (email) => {
        const existedMail = await accountModel.findOne({email});
        if (existedMail)
            return true;
        return false;
    }

    insertAccount = async (email, password, userId) => {
        try 
        {
            const hashPassword = await argon2.hash(password);
            const account = new accountModel({email, password: hashPassword, userId});
            await account.save();

            const accessToken = jwt.sign(
                {accountId: account._id},
                process.env.SECRET
            )

            return accessToken;
        }
        catch(err)
        {
            console.log(err.message);
        }
    }

    async loginAccount(req, res)    
    {
        console.log(req.body);
        const {email, password} = req.body;
        if (!email || !password)
            return res.json({success: false, message: 'Missing email or/and password'});

        try {
            const account = await accountModel.findOne({email});
            if (!account)
                return res.json({success: false, message: 'Invalid email user'});
            
            const verifyPass = await argon2.verify(account.password, password);

            if (!verifyPass)
                return res.json({success: false, message: 'Invalid password'});
            
            const accessToken = jwt.sign(
                {accountId: account._id},
                process.env.SECRET
            )

            return res.json({success: true, message: 'Login account successfully', accessToken});
        }   
        catch (err)
        {
            return res.json({success: false, message: err.message});
        }
    }


    changePassword = async (req, res) => {
        const {password} = req.body;

        if (!password)
            return res.json({success: false, message: 'Missing password to change'});

        try 
        {
            const hashPassword = await argon2.hash(password);
            await accountModel.findOneAndUpdate(req.accountId, {password: hashPassword});
            return res.json({success: true, message: 'Change password successfully'});
        }
        catch (err)
        {
            return res.json({success: false, message: err.message});
        }
    }


    getAccount = async (req, res) => {
        const accountId = req.accountId;

        try 
        {
            const account = await accountModel.findById(accountId).select('-password');
            const user = await userModel.findById(account.userId);
            if(account)
                return res.json({success: true, message: 'Get Account Successfully', account, username: user.lName});
        }
        catch(err)
        {
            return res.json({success: false, message: err.message});
        }
    }
}

module.exports = new accountController;