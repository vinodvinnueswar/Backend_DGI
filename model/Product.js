
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        require:true,
    },
    price:{
        type:String,
        require:true,
    },
    category:{
        type:[{
            type:String,
            enum:["Birthday","Wedding","Halfsaree"]
        }]
    },
    image:{
        type:String,
    },
    description:{
        type:String,
    },
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        }
    ]
})

const Product = mongoose.model('Product',productSchema);

module.exports = Product