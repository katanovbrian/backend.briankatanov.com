// importing the modules 
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const passportLocalMongoose = require('passport-local-mongoose'); 
const { roles } = require('../constants/constants')

const RoleSchema  = new mongoose.Schema({ 
    value: { type: String, enum: Object.values(roles), required : true, default:roles.viewer }
});

const UserSchema = new Schema({   
    email: {type: String, required:true, unique:true}, 
    token : {type : String},
    roles : {type:[RoleSchema], required : true, default: [{}]}
}); 


// plugin for passport-local-mongoose 
UserSchema.plugin(passportLocalMongoose); 
  
// exporting the userschema 
 module.exports = mongoose.model("User", UserSchema);