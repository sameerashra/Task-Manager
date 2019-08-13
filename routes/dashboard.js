var express = require('express');
var TaskController = require('../controllers/TaskController')
var router = express.Router();

var AuthController = require('../controllers/AuthController')

// Route and middleware for homepage
router.get('/', TaskController.dashboardData);

module.exports = router;