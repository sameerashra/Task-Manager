var mongoose = require('mongoose');

// Schema for user data
var UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    username: {type:String, required:true, unique:true},
    passwordHash: {type:String, required:true}
},{
    timestamps: true
})

module.exports = mongoose.model('User',UserSchema)