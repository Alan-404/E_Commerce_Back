const { model } = require('mongoose');
const bannerModel = require('../models/bannerModel')

class bannerController {


    async insertBanner (req, res){
        const {image} = req.body;

        if (!image)
            return res.status(400).json({success: false, message:'Not image added'})
        try 
        {   
            const banner = new bannerModel({image});
            await banner.save();
            return res.json({success: true, message: 'Add banner successfully'});
        }
        catch (err)
        {
            return res.status(500).json({success: false, message: err.message});
        }
    }


    async getAllBanner (req, res){
        try 
        {
            const banners = await bannerModel.find({});

            return res.json({success: true, message: 'Get all banners', banners});
        }
        catch(err)
        {
            return res.json({success: false, message: err.message})
        }
    }
}

module.exports = new bannerController;