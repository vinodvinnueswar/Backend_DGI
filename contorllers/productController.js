
const { error } = require('console');
const Product = require('../model/Product');
const Vendor = require('../model/Vendor')
const multer = require('multer');
const path = require('path');
const { FILE } = require('dns');

const storage = multer.diskStorage({
    destination: function(req, file , cb) {
        cb(null , 'uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage : storage});


const addProduct = async(req , res) => {
    try {
        const {productName, price, category,description} = req.body;
        const image = req.file ? req.file.filename : undefined;

        // const vendorId = req.params.vendorId;
        const vendor = await Vendor.findById(req.vendorId);

        if(!vendor){
            res.status(404).json({error:"vendor  not found"});
        }
        
        const product  = new Product({
            productName,price,category,description,image,vendor: vendor._id
        })
        const savedProduct = await product.save();

        const productId = savedProduct._id
 
        vendor.product.push(savedProduct)

        await vendor.save()

        return res.status(200).json({message:'product added successfully',productId})

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal server error"})
        
    }

    }

    const getProductByVendor= async(req, res) => {
        try {
            const vendorId = req.params.vendorId;
            const vendor = await Vendor.findById(vendorId);
    
            if (!vendor) {
                return res.status(404).json({ error: "No vendor found" });
            }
    
            // const restaurantName = vendor.vendorName;
            const products = await Product.find({ vendor: vendorId });
    
            res.status(200).json({ products});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" })
        }
    }
    
    
    const deleteProductById = async(req,res) => { 
        try {
            
         const productId = req.params.productId;
    
         const deleteProduct = await Product.findByIdAndDelete(productId[0]);
    
         if(!deleteProduct){
            return res.status(404).json({error : "No product found"})
    
         }
         res.status(200).json({message:"Product deleted successfully"});
    
    
        } catch (error) {
    
            console.error(error);
            res.status(500).json({error:"Internal server error"});
            
        }
    }
    


    module.exports = {addProduct : [upload.single('image'),addProduct] ,getProductByVendor , deleteProductById}