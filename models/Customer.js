const {Schema,model}=require('mongoose')

const customerSchema=new Schema({
    customerName:{
        type:String,
        min:[1,"Name Should Have Atleast One Character"],
        max:[20,"Name Can Have Atmost One Character"],
        required:true,
    },
    email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Invalid Email"],
        unique:true,
        required:true,
    },
    mobile:{
        type:String,
        validate:[{
            validator:(value)=>value.length===10,
            message:"Mobile Number must be 10 characters long"
        }],
        required:true,
    },
    city:{
        type:String,
        min:[1,"City Should Have Atleast One Character"],
        required:true,
    },
})

module.exports=model("Customer",customerSchema);