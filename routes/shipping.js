const router=require('express').Router()

const {addShippingDetails}=require('../controllers/shippingDetails')

router.post('/',addShippingDetails)

module.exports=router