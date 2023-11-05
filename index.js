// 3rd Party Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser=require('body-parser')
require("dotenv").config();

// Custom Imports
const { MONGODB_URI } = require("./utils/env");

// Router Imports
const customerRouter=require('./routes/customer')
const purchaseRouter=require('./routes/purchase')
const shippingRouter=require('./routes/shipping');
const asyncWrapper = require("./utils/asyncWrapper");
const errorHandlermiddlewares = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/customer',customerRouter)

app.use('/purchase-order',purchaseRouter)

app.use('/shipping-details',shippingRouter)

app.use(asyncWrapper(async (req,res,next)=>{
  res.json({err:"Route Not Found!"});
}));

app.use(errorHandlermiddlewares)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.info(`Server Listening @ PORT : ${PORT}`);
    })
  })
  .catch((error) => {
    console.error(`Database connection Unsuccessful!\n Error:${error}`);
  });
