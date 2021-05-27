const express = require('express')
const router = express.Router()
const passport = require('passport')
const { getAllGames, uploadGame, modifyGame, deleteGame } = require('../controllers/gameController')

router.route('/games')
    .get(getAllGames)
    .post(uploadGame)
router.route('/game/:titleOrId')
    .put(modifyGame)
    .delete(deleteGame)

module.exports = router