const Commande= require("../models/commande");
const {
	verifyToken,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
//Create
router.post("/", verifyToken, async (req, res) => {
	const newCommande = new Commande(req.body);
	try {
		const savedCommande = await newCommande.save();
		res.status(200).json(savedCommande);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedCommande = await Commande.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedCommande);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Get User Commande
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
	try {
		const Commande = await Commande.find({ userId: req.params.userId });
		res.status(200).json(Commande);
	} catch (error) {
		res.status(500).json(error);
	}
});
//Get All
router.get("/", verifyTokenAndAdmin, async (req, res) => {
	try {
		const Commandes = await Commande.find();
		res.status(200).json(Commandes);
	} catch (error) {
		res.status(500).json(error);
	}
});
//delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
	try {
		await Commande.findByIdAndDelete(req.params.id);
		res.status(200).json("le Commande a ete supprime avec success ...!");
	} catch (error) {
		res.status(500).json(error);
	}
});
//Get MOnthly Income
router.get("/income",verifyTokenAndAdmin,async (req,res)=>{
    const date = new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth()-1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income=await Commande.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:sales},
                }
            }
        ]);
            res.status(200).json(income);
        }
    catch(error) {
        res.status(500).json(error);
    }
});
module.exports = router;
