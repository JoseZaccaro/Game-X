const express = require('express')
const router = express.Router()
const passport = require('passport')
const hardwareControllers = require('../controllers/hardwareControllers')
const gameController = require('../controllers/gameController')
const userController = require('../controllers/userController')
const validatorUser = require('../config/validatorUser')


const {newUser, logIn, forcedLogin} = userController
const { getAllGames, uploadGame, modifyGame, deleteGame, deleteGameImageBackground } = gameController
const{getAllHardwares, getOneHardware, deleteHardware, addNewHardware, updateHardware, deleteHardwareImageBackground}=hardwareControllers


// ------------ROUTES USER---------
router.route('/user/signup')
.post(validatorUser,newUser)

router.route('/user/login')
.post(logIn)

router.route('/user/loginLS')
.get(passport.authenticate('jwt', {session: false}), forcedLogin)


// ------------ROUTES GAMES---------
router.route('/games')
    .get(getAllGames)
    .post(uploadGame)
router.route('/game/:titleOrId')
    .put(modifyGame)
    .delete(deleteGame)
router.route('/game/:fileName')
    .delete(deleteGameImageBackground)



// ------------ROUTES HARDWARE---------
router.route('/hardware')
.get(getAllHardwares)
.post(addNewHardware)

router.route('/hardware/:id')
.get(getOneHardware)
.delete(deleteHardware)
.put(updateHardware)

router.route('/hardware/:fileName')
    .delete(deleteHardwareImageBackground)

module.exports = router