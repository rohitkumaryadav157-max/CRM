const mongoose = require('mongoose');

const followupSchema = mongoose.Schema({


    enq:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'studentEnquiry'
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    nextdate:{
        type:String
    },
    programme:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    remark:{
        type:String
    }},{
        timestamps:true
    })
module.exports= mongoose.model('followup',followupSchema)
