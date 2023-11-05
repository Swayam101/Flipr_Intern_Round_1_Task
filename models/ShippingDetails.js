const {Schema,model}=require('mongoose')

const ShippingSchema=new Schema({
    address:{
        type:String,
        required:true,
        min: [1, "Address should have at least one character"],
        max: [255, "Address is too long"],
    },
    city:{
        type:String,
        required:true,
        match:[/^[a-zA-Z\s]+$/,"Invalid City Name"]
    },
    pincode:{
        type:String,
        required:true,
        match: [/^\d{6}$/, "Invalid Pincode"]
    },
    purchaseOrderID:{
        type:Schema.Types.ObjectId,
        ref:"PurchaseOrder"
    },
    customerID:{
        type:Schema.Types.ObjectId,
        ref:"Customer"
    }
})

module.exports=model("ShippingDetail",ShippingSchema)