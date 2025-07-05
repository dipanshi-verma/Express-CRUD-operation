const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true,min:[1]},
    category:{type:String},
    inStock:{type:Boolean,default:true}
})


module.exports=mongoose.model('Product',ProductSchema)
