const express = require('express')
const router = express.Router()
const passport = require('passport')
const hardwareControllers = require('../controllers/hardwareControllers')
const gameController = require('../controllers/gameController')


const { getAllGames, uploadGame, modifyGame, deleteGame } = gameController
const{getAllHardwares, getOneHardware, deleteHardware, addNewHardware, updateHardware}=hardwareControllers

// ------------ROUTES GAMES---------
router.route('/games')
    .get(getAllGames)
    .post(uploadGame)
router.route('/game/:titleOrId')
    .put(modifyGame)
    .delete(deleteGame)


// ------------ROUTES HARDWARE---------
router.route('/hardware')
.get(getAllHardwares)
.post(addNewHardware)

router.route('/hardware/:id')
.get(getOneHardware)
.delete(deleteHardware)
.put(updateHardware)

module.exports = router