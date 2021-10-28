const advertisementModel = require('../models/advertisementModel')


class advertisementController{

    //GET
    async getAd(req, res)
    {
        try {
            const response = await advertisementModel.find({});
            return res.json({success: true, message: 'Get advertisement', advertisement: response})
        }
        catch(err)
        {
            return res.json({sucess: false, message: err.message});
        }
    }

    

    //POST
    async addAd(req, res)
    {
        const {image} = req.body;

        if (!image)
            return res.json({sucess: false, message: 'Missing image to save'});
        try 
        {
            //const adExisted = await advertisementModel.find({});
            /* if (adExisted)
                await deleteAd(); */
            const newAd = new advertisementModel({image});
            newAd.save();

            return res.json({success: true, message: 'Add advertisement successfully'});
        }
        catch(err)
        {
            return res.json({success: false, message: err.message})
        }
    }


    //DELETE
    async deleteAd ()
    {
        try {
            await advertisementModel.remove();
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
}

module.exports = new advertisementController;