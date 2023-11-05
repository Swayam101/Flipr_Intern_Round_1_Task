const asyncWrapper = require("../utils/asyncWrapper");

const PurchaseOrder=require('../models/PurchaseOrder')

exports.addPurchaseOrder=asyncWrapper(async (req,res,next)=>{
    const {name,quantity,pricing,MRP}=req.body
    const {customerID}=req.params
    const purchaseOrder=await PurchaseOrder.create({productName:name,quantity,pricing,MRP,customerID})
    res.json(purchaseOrder)
})