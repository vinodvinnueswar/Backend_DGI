
const express = require('express');
const productController = require('../contorllers/productController');
const verifyToken = require('../middlewares/verifyToken')

const router = express.Router();

router.post('/add-product',verifyToken, productController.addProduct);
router.get('/:vendorId/products' , productController.getProductByVendor)


router.get('/uploads/:imageName',(req,res) => { 
    const imageName = req.params.imageName;
    res.header('content-type' , 'image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

router.delete('/:productId', productController.deleteProductById);

module.exports  = router;