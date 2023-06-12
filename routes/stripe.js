const router = require("express").Router();
const stripe=require("stripe")(process.env.Stripe_Secretkey);

router.post('paiement',(req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount:req.body.amount,
        currency:"fcfa"
    },(StripeErr,StripeRes)=>{
        if(StripeErr){
            res.status(500).json(StripeErr);
        }else{
            res.status(200).json(StripeRes);
        }
    })
})

module.exports=router;