const mongoose = require ('mongoose')

const hardwareSchema = new mongoose.Schema({
        productName:{type:String, required:true},
        price:{type:Number, required:true},
        brand:{type:String, required:true},
        description:{type:String, required:true},
        features:[{type:String, required:true,}],
        stock:	{type:Number, default:0},
        aditionals:[{gameId:{type: mongoose.Types.ObjectId, ref: 'game', required:true}, productId:{type: mongoose.Types.ObjectId, ref: 'hardware', required:true}}],
        virtual:{type:Boolean, default:false},
        imageBanner:{type:String, required:true},
        imagesBackground:[{type:String, required:true}],
        
})

const Hardware = mongoose.model ('hardware', hardwareSchema )

module.exports = Hardware