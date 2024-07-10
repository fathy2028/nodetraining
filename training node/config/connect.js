const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://admin:lord12345@test.qymz9ur.mongodb.net/?retryWrites=true&w=majority&appName=test")
.then(()=>{
    console.log("connected")
}).catch((err)=>{
console.log(err);
})
module.exports=mongoose;