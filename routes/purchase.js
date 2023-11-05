const router=require('express').Router()

const {addPurchaseOrder}=require('../controllers/purchaseOrder')

router.post('/:customerID',addPurchaseOrder)

module.exports=router