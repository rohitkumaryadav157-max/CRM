const express = require('express');
const userModule = require('../Models/userModel');
const stEnqModel = require('../Models/stEnqModel');
const userRouter = express.Router();

// GET ALL USERS
userRouter.get('/', async (req, res) => {
    const user = await userModule.find();
    return res.json({
        msg: "success",
        user
    });
});

// GET SINGLE USER
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await userModule.findById(id);

    return res.json({
        msg: "success",
        user
    });
});

// CREATE USER
userRouter.post('/', async (req, res) => {
    await userModule.create(req.body);

    return res.json({
        msg: "success"
    });
});

//  DELETE USER
userRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await userModule.findByIdAndDelete(id);

    return res.json({
        msg: "success"
    });
});

//  UPDATE USER
userRouter.put('/:id', async (req, res) => {
    const id = req.params.id;
    await userModule.findByIdAndUpdate(id, req.body);

    return res.json({
        msg: "success"
    });
});

//to update user status 

userRouter.put('/:id/:st', async (req,res)=>{
    const {id,st} = req.params;
    const status = st=="u"?"b":"u"
    const user = await userModule.findByIdAndUpdate(id,{status});
   if(st=="u"){
     await stEnqModel.updateMany({assignto:user._id},{$set:{assignto:null},});
   }
    return res.json({
        "msg":"success"
    });
});

//  EXPORT
module.exports = userRouter;