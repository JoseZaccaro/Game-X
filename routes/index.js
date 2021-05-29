const express = require('express')
const router = express.Router()
const passport = require('passport')
const hardwareControllers = require('../controllers/hardwareControllers')
const gameController = require('../controllers/gameController')
const userController = require('../controllers/userController')
const validatorUser = require('../config/validatorUser')
const buyController  = require('../controllers/buyController')
const chatControllers = require('../controllers/chatControllers')



const { getChatOfUser, postChatOfUser } = chatControllers
const { newUser, logIn, forcedLogin, getUser } = userController
const { getAllGames, uploadGame, modifyGame, deleteGame, findOneGame, deleteGameImageBackground } = gameController
const{getAllHardwares, getOneHardware, deleteHardware, addNewHardware, updateHardware, deleteHardwareImageBackground}=hardwareControllers
const {getBuyByID , getAllbuys , modifyBuyByID , deleteBuyByID } = buyController

// ------------ROUTES USER---------
router.route('/user')
.put(getUser)

router.route('/user/signup')
    .post(validatorUser, newUser)

router.route('/user/login')
    .post(logIn)

router.route('/user/loginLS')
    .get(passport.authenticate('jwt', { session: false }), forcedLogin)


// ------------ROUTES GAMES---------
router.route('/games')
    .get(getAllGames)
    .post(uploadGame)
router.route('/game/:_id')
    .get(findOneGame)
    .put(modifyGame)
    .delete(deleteGame)
router.route('/game/edit/:fileName')
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

//------------ROUTES BUYS ---------
router.route('/buy')
.get(getAllbuys)

router.route('/buy/:id')
.get(getBuyByID)
.delete(deleteBuyByID)
.put(modifyBuyByID)

// ------------ROUTES CHATS---------
router.route('/chats/:_id')
.get(getChatOfUser)
.post(passport.authenticate('jwt', {session:false}), postChatOfUser)




module.exports = router