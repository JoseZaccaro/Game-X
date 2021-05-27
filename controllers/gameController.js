const Game = require("../models/Game");

const gameControllers = {
    uploadGame: async(req, res) => {
        try {
            const {
                title, //String
                year, // Number
                genre, // [String]
                language, // [String]
                developer, // String
                online, // Boolean
                platform, // [String]
                price, // Number
                description, // String
                discount, // Number
                DLC, // [Object:{name:String,price:Number,description:String}]
                valoration, // [{good:Boolean, commentary:String, userId: (ObjectId ref:'user') }]
                imageBanner, // String
                imagesBackground, //[String]
                PEGI, //Number
                virtual, // Boolean
            } = req.body;

            const dataToUpload = {
                title,
                year,
                genre,
                language,
                developer,
                online,
                platform,
                price,
                description,
                discount,
                DLC,
                valoration,
                imageBanner,
                imagesBackground,
                PEGI,
                virtual
            };
            let error

            const newGame = new Game(dataToUpload)
            await newGame.save()
            res.json({ success: true, response: newGame })

        } catch (e) {
            // console.log(e)
            res.json({ success: false, response: e })
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


    }
};

module.exports = gameControllers;