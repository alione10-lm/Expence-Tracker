
import Transaction from "../models/transaction.schema"

let balance=0;

async function getCurrentBalanceController(req,res){
    
    const userId=req.params.userId;//req.params : hiya tari9a bax ranjibo mn requist

    const transactions = await Transaction.find({userId}); // await kaykhali node.js ystna hta tji bayanat mn db  , w ktkhdm m3a async darouri

    transactions.forEach((e)=>{
        if(e==="income") balance += e.amount;
        if(e==="expense") balance -= e.amount;
    })

    res.json({succes : true , balance})

}

getCurrentBalanceController();