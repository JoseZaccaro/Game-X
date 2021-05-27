const express =require ('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../controllers/userController')
const validatorUser = require('../config/validatorUser')


const {newUser, logIn, forcedLogin} = userController




router.route('/user/signup')
.post(validatorUser,newUser)

router.route('/user/login')
.post(logIn)

router.route('/user/loginLS')
.get(passport.authenticate('jwt', {session: false}), forcedLogin)




module.exports = router