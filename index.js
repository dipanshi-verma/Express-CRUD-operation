const express = require('express')
const mongoose=require("mongoose")
const app = express()
const bodyParser= require('body-parser');
const cors= require('cors')
const port = 3000
const Product= require("./models/Product");



// Middleware
app.use(cors());
app.use(bodyParser.json())
mongoose.connect(
  "mongodb+srv://2405112110133:06BfachnxrwzafDf@cluster0.jzqyt9c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
console.log("Mongodb Connected Successfully");

// Method 1-> Post Method
app.post('/products',async (req,res)=>{
    try{
         const {name,price,category,inStock}=req.body;
         const product = new Product({
          name,
          price,
          category,
          inStock
         })
         const newProduct= await product.save();
         return res.status(200).json({message:"My first api of signup is created",newProduct})
        }
        catch(err){
         return res.status(500).json({message:"An Error occured",err});
    }
   
})



// GetMethod
app.get('/products',async(req,res)=>{
  try{
      const product=await Product.find();
      res.json(product);
    }
    catch(error){
    return res.status(500).json({message:"An Error occured",error})
  }
})



// get products whose instock:true
app.get('/products/in-stock',async(req,res)=>
    {
        try{
            const product=await Product.find({inStock:true});
            res.json(product);
            }
            catch(error){
                return res.status(500).json({message:"An Error occured",error})
                }
     })



// Get product by id
app.get('/products/:id',async(req,res)=>{
  try{
      const product=await Product.findById(req.params.id);
      if(!product){
        return res.status(400).json({message:"Product is not present kindly check your data"})
      }
      res.json(product);
  }catch(error){
   return res.status(500).json({message:"An Error occured",error})
  }
})





//Put method to update user
app.put("/products/:id",async(req,res)=>{
  try{
    // findByIdAndUpdate
    const updated=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updated){
      return res.status(400).json({messsage:"Product not exists"})
    }
    res.json(updated);
  }catch(error){
    return res.status(500).json({message:"An error occured"})
  }
})




// Delete Method
app.delete("/products/:id",async(req,res)=>{
  try{
    const deleted=await Product.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(400).json({messsage:"Product not exists"})
    }
    res.json(deleted);
  }catch(error){
    return res.status(500).json({message:"An error occured"})
  }
})


app.listen(port, () => {
  console.log(`Assignment app listening on port ${port}`)
})
