const { Schema, model } = require("mongoose");

const purchaseOrderSchema = new Schema({
  productName: {
    type: String,
    min: [1, "Product Name Should Have Atleast One Character"],
    max: [20, "Product Name Can Have Atmost One Character"],
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  pricing: {
    type: Number,
    required: true,
    min: [1, "Pricing must be at least 1"],
  },
  MRP: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return this.pricing <= value;
      },
      message: "MRP must be greater than or equal to Pricing",
    },
  },
  customerID: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

module.exports = model("PurchaseOrder", purchaseOrderSchema);
