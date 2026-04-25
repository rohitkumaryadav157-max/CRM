const express=require('express');
const assignModel = require('../Models/assignModel');
const assignRouter = express.Router();



assignRouter.post('/',async(req,res)=>{
    await assignModel.create(req.body)
    return res.json({"msg":"Success"})
})
assignRouter.get('/',async(req,res)=>{
    const assign =await assignModel.find();
    return res.json({"msg":"Success",assign})
})

module.exports =assignRouter