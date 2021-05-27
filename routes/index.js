const express =require ('express')
const router = express.Router()
const passport = require('passport')
const hardwareControllers = require('../controllers/hardwareControllers')

const{getAllHardwares, getOneHardware, deleteHardware, addNewHardware, updateHardware}=hardwareControllers

// ------------ROUTES HARDWARE---------
router.route('/hardware')
.get(getAllHardwares)
.post(addNewHardware)

router.route('/hardware/:id')
.get(getOneHardware)
.delete(deleteHardware)
.put(updateHardware)

module.exports = router