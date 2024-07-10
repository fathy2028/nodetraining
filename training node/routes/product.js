const express=require("express");
const product=require("../models/product")
const router=express.Router();
const multer=require("multer");

filename="";
const mystore=multer.diskStorage({
    destination:"./uploads",
    filename: (req,file,redirect)=>{
        let date=Date.now();
        let fl=date+"."+file.mimetype.split("/")[1];
        redirect(null,fl);
        filename=fl;
    }
})

const upload=multer({storage:mystore});

router.post("/addprod",upload.any("image"),async(req,res)=>{
    try {
        data=req.body;
        prod=new product(data);
        prod.image=filename;
        saved=await prod.save();
        filename="";
        res.send(saved);
    } catch (error) {
        res.send(error)
    }
    })
    
    router.get("/getproducts",async(req,res)=>{
        try {
            products=await product.find();
            res.send(products);
        } catch (error) {
            res.send(error)
        }
    })
    
    router.get("/getproductsspe",async(req,res)=>{
        try {
            products=await product.find({price:{ $gt: 21 }});
            res.send(products);
        } catch (error) {
            res.send(error)
        }
    })
    
    router.get("/getproduct/:id",async(req,res)=>{
        try {
            id=req.params.id;
            prod=await product.findById(id);
            res.send(prod)
        } catch (error) {
            res.send(error)
        }
    })
    router.delete("/deleteprod/:id",async(req,res)=>{
        try {
            id=req.params.id;
            await  product.findByIdAndDelete(id);
            res.status(200).send("deleted successfuly");
        } catch (error) {
            res.send(error)
        }
    })
    
    router.put("/updateprod/:id",async(req,res)=>{
        try {
            id=req.params.id;
            newdata=req.body;
            updated=await product.findByIdAndUpdate(id,newdata,{new:true});
            res.status(200).send(updated)
        } catch (error) {
            res.send(error)
        }
    })

module.exports=router;