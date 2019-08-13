var router = require('express').Router();
var AuthController = require('../controllers/AuthController')


// Routes and middleware for login registration and logout
router.get('/login', AuthController.loginForm)
router.post('/login', AuthController.login)
router.get('/register', AuthController.registerForm)
router.post('/register', [
    AuthController.registerFormValidator,
    AuthController.register
])
router.get('/logout', AuthController.logout)

module.exports = router