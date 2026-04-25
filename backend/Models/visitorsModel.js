const mongoose = require('mongoose');
const { type } = require('os');

const  visitorSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:true
  },
  role:{
    type:String,
    required:true
  },
  remark:{
    type:String,
    required:false
  },
  },{
     timestamps:true

     
  })

  module.exports =mongoose.model("visitor",visitorSchema)