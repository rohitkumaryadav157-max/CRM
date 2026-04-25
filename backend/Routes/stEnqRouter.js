const express= require('express');
const stEnqModel = require('../Models/stEnqModel');
const stEnqRouter = express.Router();

//GET ALL DATA
stEnqRouter.get('/',async (req,res)=>{
    //use populate function for taking value from two table
const user = await stEnqModel.find().populate('assignto');

return res.json({
  msg: "success",
  enq: user
});
});


// GET SINGLE DATA
stEnqRouter.get('/:id', async (req, res) => {
    const user = await stEnqModel.findById(req.params.id);
    res.json(user);
});



//INSERT DATA (that show to user OR viewer) 
stEnqRouter.post('/',async(req,res)=>{
    const user =req.body;
    await stEnqModel.create(user);

    return res.json({
        "msg":"success",
        'user':user
    });
});

//UPDATE DATA
stEnqRouter.put('/:id', async (req, res) => {
    const updatedUser = await stEnqModel.findByIdAndUpdate(req.params.id,req.body);

    return res.json({
        "msg": "User updated successfully",
        "user": updatedUser
    });
});


//DELETE DATA

stEnqRouter.delete('/:id', async (req, res) => {
    await stEnqModel.findByIdAndDelete(req.params.id);

    return res.json({
        "msg": "User deleted successfully"
    });
});

module.exports= stEnqRouter;


