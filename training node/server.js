const express=require("express");
require("./config/connect")
const productrouter=require("./routes/product");
const userrouter=require("./routes/user")
var app=express();
app.use(express.json());
app.use("/product",productrouter);
app.use("/user",userrouter);
app.listen(3030);