const product = require("../models/product");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
	const newProduct = new product(req.body);
	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct); 
	} catch (error) {
		res.status(500).json(error);
	}
});
//Update
router.put('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updatedPrduct= await product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updatedPrduct)
    } catch (error) {
        res.status(500).json(error);
    }

});
//Get Product
router.get('/find/:id',async(req,res)=>{
    try {
        const product=await product.findById(req.params.id);
		res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});
//Get All Products
router.get('/',async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category;
    try {
       let products;
       if(qNew){
        products=await product.find().sort({createdAt:-1}).limit(1);
       }else if(qCategory){
        products=await product.find({categories:{
            $in:[qCategory],
        }});
       }else{
            products= await product.find();
       }
       res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});
//delete
router.delete('/:id',verifyTokenAndAdmin,async(req,res)=>{
    try {
        await product.findByIdAndDelete(req.params.id);
        res.status(200).json("le produit a ete supprime avec success ...!");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
