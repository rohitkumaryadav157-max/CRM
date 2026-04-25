
const mongoose = require ('mongoose');

const addenqschema = mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    programe:{
        type:String,
        required:true
    },
    center:{
        type:String,
        required:true
    },
    source:{
        type:String,
        required:true
    }
    },{ 
            timeStamps:true
    })

    module.exports = mongoose.model('Addenquiry',addenqschema)