

const mongoose = require ('mongoose');
const adminschema =mongoose.Schema({

     email:{
        type:String,
        rquired: true,
        unique: true
    },
    password:{
         type:String,
        rquired: true
      }
    },{
        timeStamp: true
});

module.exports = mongoose.model('admin',adminschema);