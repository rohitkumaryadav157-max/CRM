const express = require('express');
const followupModel = require('../Models/followupModel');
const followupRoute = express.Router();


//getting data of follow-up
followupRoute.get('/',async(req,res)=>{
    
    const followup = await followupModel.find().populate('uid').populate('enq');
    return res.json({'msg':"success",followup});

})

//post data of followup
followupRoute.post('/', async (req,res)=>{

    const followup = await followupModel.create(req.body);
    return res.json({'msg':"success"});
})

module.exports = followupRoute;