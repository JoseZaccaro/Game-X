const HardwareModel = require('../models/Hardware')
const fs = require('fs')

const hardwareControllers = {
    addNewHardware: async (req, res)=>{
        let response;
        let error;
        try {
            const hardwareToAdd = new HardwareModel(req.body)
            await hardwareToAdd.save()
            const allHardwares = await HardwareModel.find()
            response = allHardwares
        } catch (err) {
            error= 'Error, could not add new hardware'
            console.log(err);
        }
        res.json({ success: !error ? true : false, response, error })
    },
    getAllHardwares: async (req,res) =>{
        console.log('Hola');
        let response;
        let error;
        try {
            const allHardware = await HardwareModel.find()
            response= allHardware
        } catch (err) {
           error= 'Error, could not get all hardwares'
           console.log(err);
        }
        res.json({ success: !error ? true : false, response, error })
    },
    updateHardware: async (req, res)=>{
        let response;
        let error;
        const idHardware = req.params.id
        try {
            const hardwareToUpdate = await HardwareModel.findOneAndUpdate({_id: idHardware}, {...req.body}, {new: true})
            response = hardwareToUpdate
        } catch (err) {
            error= 'Error, could not upgrade hardware'
           console.log(err);
        }
        res.json({success: !error ? true : false, response, error})
    },
    deleteHardware: async (req, res)=>{
        let response;
        let error;
        const idHardware = req.params.id
        try {
            await HardwareModel.findOneAndRemove({_id: idHardware})
            response= 'Delete complete'
        } catch (err) {
            error= 'Error, the hardware could not be erased'
           console.log(err);
        }
        res.json({success: !error ? true: false, response, error})
    },
    getOneHardware: async (req, res)=>{
        let response;
        let error;
        const idHardware = req.params.id
        try {
            const hardware = await HardwareModel.findById(idHardware)
            response = hardware
        } catch (err) {
            error= 'Error, Could not get the hardware'
           console.log(err);
        }
        res.json({success: !error ? true: false, response, error})
    },
    deleteHardwareImageBackground: (req, res) => {
        const imageToDelete = req.params.fileName
        fs.unlink(`${__dirname, './'}/client/build/fotos/${imageToDelete}`, error => {
            if (error) {
                return res.json({success: false, error})
            }
            res.json({success: true, mensaje: "Borrado!"})
        })
    }
}
module.exports = hardwareControllers