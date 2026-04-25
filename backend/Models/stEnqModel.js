const mongoose = require('mongoose');

const stEnqSchema = new mongoose.Schema({

  fullName:{ type:String, required:true },
  college:{ type:String, required:true },
  course:{ type:String, required:true },
  branch:{ type:String, required:true },
  center:{ type:String, required:true},
  email:{ type:String, required:true, unique:true },
  contactNumber:{ type:Number, required:true },
  purpose:{ type:String, required:true},
  year:{ type:Number, required:true },
  role:{ type:String, required:true },
  status:{ type:String, default:"new" },
  assignto:{ type:String, ref:'user'},
  assignby:{type:String ,ref:'user'},
  assigndate:{type:String},
  nextfollowupdate:{type:String},
  forprogram:{type:String, },
  source:{type:String, default:'walk-in'},//telephonic , website, walk-in
  remark:{type:String}

},{timestamps:true}
);

module.exports = mongoose.model('studentEnquiry', stEnqSchema);