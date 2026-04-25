const express = require('express');
const centerModel = require('../Models/centerModel');
const userModel = require('../Models/userModel');
const stEnqModel = require('../Models/stEnqModel');
const centerRoute = express.Router();

// GET all centers
centerRoute.get('/', async (req, res) => {
    const center = await centerModel.find();
    return res.json({ msg: "success", center });
});

// CREATE center
centerRoute.post('/', async (req, res) => {
    await centerModel.create(req.body);
    return res.json({ msg: "success" });
});

// GET single center
centerRoute.get('/:id', async (req, res) => {
    const id = req.params.id;
    const center = await centerModel.findById(id);
    return res.json({ msg: "success", center });
});

// UPDATE center
centerRoute.put('/:id', async (req, res) => {
    const id = req.params.id;
    await centerModel.findByIdAndUpdate(id, req.body);
    return res.json({ msg: "success" });
});

//update center by status (active or deactive )

centerRoute.put('/:id/:st', async (req,res)=>{
    const {id,st} = req.params;
    let ust = st=="Active"?"b":"u";//user status
    let est = st=="Active"?"b":"u";//enuiry status
    let status = st=="Active"?"Deactive":"Active"; //center status
    const center = await centerModel.findByIdAndUpdate(id,{status}); //to change center status
    await userModel.updateMany({center:center.name},{$set:{status:ust}}) //to change user status
    await stEnqModel.updateMany({center:center.name},{$set:{status:est}}) //to change enquiry status
    return res.json({
        "msg":"success"
    });
});

// DELETE center
centerRoute.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await centerModel.findByIdAndDelete(id);
    return res.json({ msg: "success" });
});

module.exports = centerRoute;