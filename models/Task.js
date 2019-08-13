var mongoose = require('mongoose');

//Schema for tasks
var TaskSchema = new mongoose.Schema({
    username: {type:String, required:true},
    title: { type: String, required: true },
    description : {type: String},
    completed: { type: Boolean, default: false }
},{
    timestamps: true
})

module.exports = mongoose.model('Task', TaskSchema);