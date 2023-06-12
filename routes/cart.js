const cart = require("../models/cart");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//Create
router.post("/", verifyToken, async (req, res) => {
	const newcart = new cart(req.body);
	try {
		const savedCart = await newcart.save();
		res.status(200).json(savedCart);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedCart = await cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Get User Cart
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const cart = await cart.findOne({ userId: req.params.userId });
		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Get All
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const carts = await cart.find();
		res.status(200).json(carts);
	} catch (error) {
		res.status(500).json(error);
	}
});
//delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
	try {
		await cart.findByIdAndDelete(req.params.id);
		res.status(200).json("le cart a ete supprime avec success ...!");
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
