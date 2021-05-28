const Game = require("../models/Game");
const fs = require('fs')

const gameControllers = {
    uploadGame: async(req, res) => {
        console.log(req.body)
        let response;
        let error;
        if (req.user.rol === 'admin') {
            try {
                const gameToAdd = new Game(req.body)
                await gameToAdd.save()
                const allGames = await Game.find()
                response = allGames
                res.json({ success: !error ? true : false, response, error })
            } catch (err) {
                res.json({success:false, error: "There is some invalid fields"})
                console.log(err);
            }
        } else {
            res.json({success:false, error: "You must be authorized Administrator to modify this property"}) 
        }
        
        
    },
    getAllGames: async(req, res) => {
        try {
            const allGames = await Game.find()
            res.json({ success: true, response: allGames })
        } catch (e) {
            res.json({ success: false, response: e })
        }
    },
    modifyGame: async(req, res) => {
        try {

            let titleOrId = req.params.title.toLowerCase()
            const newModifications = {...req.body }
            const query = { $or: [{ title: titleOrId }, { _id: titleOrId }] };
            const gameToModify = await Game.findOneAndUpdate(query, newModifications, { new: true, runValidators: true })
            res.json({ success: true, response: gameToModify })
        } catch (e) {
            res.json({ success: false, response: e })
        }
    },
    deleteGame: async(req, res) => {
        try {

            const { titleOrId } = req.params
            await Game.findOneAndDelete({ _id: titleOrId })
            res.json({ success: true, response: "Deleted Successfully" })

        } catch (e) {
            res.json({ success: false, response: e })
        }
    },
    deleteGameImageBackground: (req, res) => {
        const imageToDelete = req.params.fileName
        fs.unlink(`${__dirname, './'}/client/build/fotos/${imageToDelete}`, error => {
            if (error) {
                return res.json({success: false, error})
            }
            res.json({success: true, mensaje: "Borrado!"})
        })
    }
};

module.exports = gameControllers;