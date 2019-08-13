var Task = require('../models/Task');

exports.getTask = function(req,res){
    Task.find({username: req.session.user.name}).then(function(tasks){
        res.render('tasks/index',{
            taskItems: tasks,
            user: req.session.user
        })
    })
}

exports.addTask = function(req,res){
    var error = req.session.errorMsg
    req.session.errorMsg = ''
    res.render('tasks/add',{
        errorMsg: error,
        user: req.session.user
    })
}

exports.deleteTask = function(req, res){
    var id = req.params.id
    Task.findByIdAndDelete(id).then(function(){
        res.redirect('/tasks')
    })
}

exports.storeTask = function(req, res){
    var title = req.body.title;
    var description = req.body.description
    
    var task = new Task()
    task.username = req.session.user.name
    task.title = title
    task.description = description

    task.save().then(function(){
        res.redirect('/tasks')
    })
}

exports.toggleStatus = function(req,res){
    var id = req.params.id
    Task.findById(id).then(function(task){
        task.completed = !task.completed
        task.save().then(function(){
            res.redirect('/tasks')
        })
    })
}

exports.taskValidator = function(req, res, next){
    var title = req.body.title;

    if(title == ''){
        req.session.errorMsg = 'Title cannot be blank';
        res.redirect('/tasks/add')
    } else {
        next()
    }
    
}

exports.dashboardData = function(req,res){
    let total = 0
    let completed=0
    if(req.session.user){
        Task.countDocuments({username: req.session.user.name},function(err, count){
            total = count
            Task.countDocuments({username: req.session.user.name, completed:true}, function(err, count_completed){
                completed = count_completed
                res.render('dashboard/index',{
                    user: req.session.user,
                    total: total,
                    completed: completed
                });
            })
        })  
    } else {
    res.render('dashboard/index',{
        user: req.session.user,
        total: total,
        completed: completed
    }); 
    }
}