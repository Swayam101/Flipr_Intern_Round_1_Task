// model Imports
const Customer = require("../models/Customer");
// const PurchaseOrder = require("../models/PurchaseOrder");

//utility Imports
const asyncWrapper = require("../utils/asyncWrapper");

exports.addCustomer = asyncWrapper(async (req, res, next) => {
  const { name, email, mobile, city } = req.body;
  const customer = await Customer.create({
    customerName: name,
    email,
    mobile,
    city,
  });
  res.json(customer);
});

exports.getCustomerDetials = asyncWrapper(async (req, res, next) => {
  const {city}=req.params
  console.log(city);
  const customers = await Customer.aggregate([
    {
      $lookup: {
        from: 'shippingdetails', // The name of the ShippingDetail collection
        localField: '_id',
        foreignField: 'customerID',
        as: 'shipmentDetail',
      },
    },
    {
      $match: {
        'shipmentDetail.city': city,
      },
    },
  ]);
  res.json(customers);
});

exports.getAllCustomerPurchases = asyncWrapper(async (req, res, next) => {
  const customerData = await Customer.aggregate([
    {
      $lookup: {
        from: "purchaseorders",
        localField: "_id",
        foreignField: "customerID",
        as: "purchaseOrders",
      },
    },
  ]);
  const result = customerData.map((customer) => {
    return {
      cutomerID: customer._id,
      ...customer,
      purchaseOrders: customer.purchaseOrders.map((order) => {
        return {
          purchaseOrderID: order._id,
          ...order,
        };
      }),
    };
  });
  res.json(result);
});

exports.getAllCustomerShipping = asyncWrapper(async (req, res, next) => {
  const customers = await Customer.aggregate([
    {
      $lookup: {
        from: 'purchaseorders', // The name of the PurchaseOrder collection
        localField: '_id',
        foreignField: 'customerID',
        as: 'purchaseOrders',
      },
    },
    {
      $lookup: {
        from: 'shippingdetails', // The name of the ShippingDetail collection
        localField: '_id',
        foreignField: 'customerID',
        as: 'shipmentDetail',
      },
    },
    {
      $project: {
        _id: 1,
        customerName: 1,
        email: 1,
        mobile: 1,
        city: 1,
        purchaseOrders: {
          _id: 1,
          productName: 1,
          quantity: 1,
          pricing: 1,
          MRP: 1,
        },
        shipmentDetail: {
          _id: 1,
          address: 1,
          city: 1,
          pincode: 1,
        },
      },
    },
  ]);
  console.log("visited!");
  res.json(customers);
});
