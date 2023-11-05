const router=require('express').Router()

const {addCustomer,getCustomerDetials,getAllCustomerPurchases, getAllCustomerShipping}=require('../controllers/customer')

router.post('/',addCustomer)

router.get('/shipping',getAllCustomerShipping)
router.get('/purchase',getAllCustomerPurchases)
router.get('/:city',getCustomerDetials)



module.exports=router