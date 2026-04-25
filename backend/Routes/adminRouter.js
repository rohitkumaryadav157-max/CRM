const express = require('express');
const adminModel = require ('../Models/adminModel');
const userModel = require('../Models/userModel');
const stEnqModel = require('../Models/stEnqModel');
const centerModel = require('../Models/centerModel');
const adminRoute = express.Router();

adminRoute.post('/log',async(req,res)=>{
    const {email,password}= req.body;
   const user = await adminModel.findOne({email});

   if(user){
    if(user.password==password){
    res.json({msg:"success",role:"admin",id:user._id})
    } else{
        res.json({msg:"password Not Match🤪🤪"})
    }
   } else {
    const user = await userModel.findOne({"email":email});
    if(user){
        if(user.password==password){
            if(user.status!="u"){
                res.json({"msg":"Your Account is block"})
            }
            res.json({msg:"success",role:user.role,id:user._id})
        } else {
            res.json({msg:"password Not Match"})
        }
    } else {
        res.json({msg:"user Not Found"})
    }
   }
})

adminRoute.get('/stats',async(req,res)=>{
    const enq = await stEnqModel.find();
    const user = await userModel.find();
    const center = await centerModel.find();

    res.json({"msg":"success","allenq":enq.length,"user":user.length,"center":center.length})
})

module.exports= adminRoute;