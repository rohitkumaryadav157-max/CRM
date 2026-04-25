
const mongoose = require ('mongoose');
const { type } = require('os');


const userSchema = mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
number:{
    type:Number,
    required:true
},
password:{
  type:String,
  default:1234
},
role:{
    type:String,
    required:true
},
center:{
    type:String,
    required:true
},
status:{
    type:String,
    default:"u"
},
qua:{
    type:String,
    
},
pic:{
    type:String
}

},{
    timestamps:true,
});

module.exports = mongoose.model("user",userSchema);