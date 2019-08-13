var express = require('express');
var TaskController = require('../controllers/TaskController')
var AuthController = require('../controllers/AuthController')

var router = express.Router();

router.use(AuthController.authMiddleware)

// Routes
router.get('/',TaskController.getTask)
router.get('/add', TaskController.addTask)
router.get('/delete/:id', TaskController.deleteTask)
router.post('/store',[TaskController.taskValidator, TaskController.storeTask])
router.get('/status/:id', TaskController.toggleStatus)

module.exports = router;