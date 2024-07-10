const express=require("express");
const encrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const user=require("../models/user")
const router=express.Router();

router.post("/register",async(req,res)=>{
    try {
        data=req.body;
        usr=new user(data);
        salt=encrypt.genSaltSync(10);
        usr.password=await encrypt.hashSync(data.password,salt);
        saved=await usr.save();
        res.send(saved)
    } catch (error) {
        res.send(error);
    }
})

router.post("/login",async(req,res)=>{
try {
    data=req.body;
    usr=await user.findOne({email:data.email});
    if(!usr){
        res.status(404).send("invalid email or passeord");
    }else{
        vaildpass=encrypt.compareSync(data.password,usr.password);
        if(!vaildpass){
            res.status(404).send("invalid email or password")
        }else{
            payload={
                id:usr._id,
                email:usr.email,
                age:usr.age
            };
            token=await jwt.sign(payload,"myself@2028");
            res.status(200).send({mytoken:token});
        }
    }
} catch (error) {
    res.status.send(error)
}
})


router.get("/getall",async(req,res)=>{
try {
   users= await user.find();
   res.send(users);
} catch (error) {
    res.send(error)
}
})

//by specifics
router.get("/getallspe",async(req,res)=>{
try {
   users= await user.find({age:21});
   res.send(users);
} catch (error) {
    res.send(error)
}
})
//by id
router.get("/getbyid/:id",async(req,res)=>{
try {
   id=req.params.id;
   userbyid= await user.findById(id);
   res.send(userbyid);
} catch (error) {
    res.send(error)
}
})

router.delete("/delete/:id",async(req,res)=>{
try {
    id=req.params.id;
    await user.findByIdAndDelete(id)
    res.send("deleted successfuly")
} catch (error) {
    res.send(error)
}
})


router.put("/update/:id",async(req,res)=>{
try {
    id=req.params.id;
    newdata=req.body;
    updated=await user.findByIdAndUpdate(id,newdata,{new:true});
    res.status(200).send(updated);
} catch (error) {
    res.status(400).send(error);
}
})

module.exports=router;