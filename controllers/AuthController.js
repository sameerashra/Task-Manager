var User = require('../models/User')
var bcrypt = require('bcryptjs')

// login form
exports.loginForm = function(req,res){
    var error = req.session.errorMsg
    req.session.errorMsg = ''   
    res.render('auth/login',{
        errorMsg: error,
        successMsg: ''
    })
}

// Authenticating user credential
exports.login = function(req,res){
    var uname = req.body.username
    var pwd = req.body.password

    User.findOne({username: uname}).then(function(user){
        if(user){
            if(bcrypt.compareSync(pwd, user.passwordHash)){
                req.session.user = {
                    name: user.name,
                    email:user.email
                } // creating session for user
                res.redirect('/dashboard')
            } else {
                req.session.errorMsg = 'Invalid credentials'
            res.redirect('/login')
            }
            
        }
        else {
            req.session.errorMsg = 'No user found'
            res.redirect('/login')
        }
    })
}

// registration form
exports.registerForm = function(req,res){
    var error = req.session.errorMsg
    req.session.errorMsg = ''
    res.render('auth/register',{
        errorMsg: error
    })
}

// on successful registration redirect to login page
exports.register = function(req,res){
    res.render('auth/login',{
        successMsg: 'Registration Complete, Please login',
        errorMsg: ''
    })
}

// logout: delete session data
exports.logout = function(req,res){
    delete req.session.user
    res.redirect('/login')
}

// resistration for user in database
exports.registerFormValidator = function(req,res,next){
    let uname = req.body.username
    let pwd = req.body.password

    User.findOne({username: uname}).then((user)=>{
        if(!user){ // if user with same username not available continue registration
            bcrypt.hash(pwd, 10, function(err,hash){
                var pwdHash = hash
                var user_detail = new User({
                    name: req.body.username,
                    email: req.body.email,
                    username: req.body.username,
                    passwordHash: pwdHash
                })
                user_detail.save((err)=>{
                    if(err) return console.log(err)
                })
            })
            next();
        }else{ // if user with same username found show error msg
            req.session.errorMsg = 'User alredy exist'
            res.redirect('/register')
        }
    })
}

// if user is logged in then continue else redirect to login page
exports.authMiddleware = function(req,res,next){
    if(typeof req.session.user === 'undefined'){
        res.redirect('/login')        
    } else {
        next()
    }
}