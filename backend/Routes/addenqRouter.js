const express = require('express');
const addenqModel = require('../Models/addenqModel');
const addenqRoute = express.Router();

addenqRoute.get('/', async (req,res)=> {
    const addenq = await addenqModel.find();
    return res.json({
        "msg":"success",
        addenq
    });
});

addenqRoute.post('/', async (req,res)=>{
    await addenqModel.create(req.body);
    return res.json({
        "msg":"success"
    });
});

addenqRoute.delete('/:id', async (req,res)=>{
    const id = res.params.id;
    await addenqModel.findByIdAndDelete(id);
    return res.json({
        "msg":"success"
    })
})

module.exports= addenqRoute;