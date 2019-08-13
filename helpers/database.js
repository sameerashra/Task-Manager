var mongoose = require('mongoose');

// connection to mongoDb database
exports.connection = function(){
    mongoose.connect(
        'mongodb://localhost:27018/taskManager',
        { useNewUrlParser: true},
        function(err){
            if(!err){
                console.log('DB Connected');
            }
        }
    );
}
