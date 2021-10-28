const productModel = require('../models/productModel');
const categoryModel = require('../models/categoryModel');

class productController{


    async insertProduct (req, res){
        const {name, image, price, quantity, categoryId} = req.body;

        if (!name || !image || !price || !quantity)
        {
            return res.status(400).json({success: false, message: 'Missing information' });
        }

        try 
        {
            const product = new productModel({name, image, price, quantity, categoryId});
            product.save();

            return res.json({success: true, message:'Insert product successfully'})
        }
        catch(err)
        {
            return res.json({success: false, message: 'Error internal server'});
        }
    }


    async getProduct(req, res)
    {
        try 
        {
            const products = await productModel.find({});
            return res.json({success: true, message: 'Get all product', products})
        }
        catch (err)
        {
            return res.json({success: false, message: 'Error internal server'})
        }
    }

    async modifyProduct (req, res)
    {
        const {name, image, price, quantity} = req.body;

        try 
        {
            await productModel.findOneAndUpdate({name}, {image, price, quantity, category});

            return res.json({success: true, message: 'Update successfully'});
        }
        catch(err)
        {
            return res.json({success: false, message:'Error internal server'});
        }
    }


    async deleleProduct(req, res)
    {
        const {name} = req.body

        try{
            await productModel.findOneAndDelete({name})
            return res.json({success: true, message: 'Delete product successfully'});
        }
        catch(err)
        {
            return res.json({success: false, message: err.message});
        }
    }


    async getProductByCategory(req, res)
    {
        const slug = req.params.slug;
        try     
        {
            const category = await categoryModel.findOne({slug});
            
            if (!category)
                return res.json({success: false, message: 'Not Found This Category'});

            const products = await productModel.find({categoryId: category._id})

            return res.json({success: true, message: 'Get products: '+ slug, products });
        }
        catch (err)
        {
            return res.json({success: false, message: err.message});
        }
        
    }
}

module.exports = new productController;