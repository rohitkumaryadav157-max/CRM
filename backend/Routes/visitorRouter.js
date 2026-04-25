const express = require('express');
const visitorModel = require('../Models/visitorsModel');
const visitorRouter = express.Router();


visitorRouter.get('/', async(req,res)=>{
    const visitor = await visitorModel.find();

    return res.json({
        "msg":"success",
    "visitor":visitor
    });
});


visitorRouter.get('/:id', async(req,res)=>{
    const visitor = await visitorModel.findById(req.params.id);
    res.json(visitor);
});




    visitorRouter.post('/', async(req,res)=>{
    await visitorModel.create(req.body);

   return res.json({
    "msg": "success",
        
   });
});





visitorRouter.put('/:id', async(req,res)=>{
   const  updatevisitor = await visitorModel.findByIdAndUpdate(req.params.id,req.body,{new:true});

   return res.json({
    "msg": "visitor updated successfully",
        "Visitor": updatevisitor
   });
});


visitorRouter.delete('/:id', async(req,res)=>{
    const deletevisitor = await visitorModel.findByIdAndDelete(req.params.id);

    return res.json({
        "msg": "visitor deleted successfully",
        "Visitor": deletevisitor
    });
});

module.exports = visitorRouter;