const { model } = require('mongoose');
const categoryModel = require('../models/categoryModel')

class categoryController{
    

    //GET
    async getAllCategory (req, res)
    {
        try{
            const response = await categoryModel.find({});

            return res.json({success: true, message:'Get all category', categories: response});
        }
        catch(err)
        {
            return res.json({success: false, message:'Error internal server'});
        }
    }


    //POST
    async insertCategory(req, res)
    {
        const {name, description, thumbnail} = req.body;

        if (!name || !description || !thumbnail)
            return res.status(400).json({success: false, message: 'Missing information'});

        try
        {
            const categoryExisted = await categoryModel.findOne({name});
            if (categoryExisted)
                return res.json({success: false, message: 'Category has been existed'});

            const category = new categoryModel({name, description, thumbnail});

            category.save();

            return res.json({success: true, message: 'Insert category successfully'});
        }
        catch(err)
        {
            return res.json({success: false, message: error.message})
        }
    }


    async getNameCategory (req, res)
    {
        const {slug} = req.body;

        try 
        {
            const category = await categoryModel.findOne({slug});
            //console.log(category)
            return res.json({success: true, message: 'Get name of category', name: category.name});
        }
        catch(err)
        {
            return res.json({success: false, message: err.message});
        }
    }
}

module.exports = new categoryController