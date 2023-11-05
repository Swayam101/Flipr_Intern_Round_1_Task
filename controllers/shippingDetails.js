const asyncWrapper = require("../utils/asyncWrapper");

const ShippingDetail = require("../models/ShippingDetails");

exports.addShippingDetails = asyncWrapper(async (req, res, next) => {
  const { address, city, pincode, purchaseOrderID, customerID } = req.body;
  const shippingDetails = await ShippingDetail.create({
    address,
    city,
    pincode,
    purchaseOrderID,
    customerID,
  });
  res.json(shippingDetails);
});
