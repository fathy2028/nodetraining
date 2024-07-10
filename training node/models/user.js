const mongoose=require("mongoose");

const user=mongoose.model("user",{
    name:{
        type:String
    },
    age:{
        type:Number
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

})
module.exports=user;