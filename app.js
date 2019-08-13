var express = require('express');
var bodyParser = require('body-parser');
var tasksRouter = require('./routes/tasks');
var dashboardRouter = require('./routes/dashboard');
var authRouter = require('./routes/auth');
var session = require('express-session');
var db = require('./helpers/database')
db.connection()

var app = express();


// express-session
app.use(session({
    secret: 'abcd1234',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

// Setting view engine as ejs
app.set('view engine', 'ejs');

// Using body-parser for post request
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.redirect('/dashboard');
})
// Routes
app.use('/', authRouter);
app.use('/tasks', tasksRouter);
app.use('/dashboard', dashboardRouter);

module.exports = app