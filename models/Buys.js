  
const mongoose = require ('mongoose')

const buySchema = new mongoose.Schema({
        products:[{gameId:{type: mongoose.Types.ObjectId, ref: 'game', default:0}, productId:{type: mongoose.Types.ObjectId, ref: 'hardware', default:0}}],
        userId:{type: mongoose.Types.ObjectId, ref: 'user', default:0},
        date:{type:String, required:true},
        paymentMethod:{type:String, required:true},
        totalPrice:{type:Number, required: true},
})

const Buy = mongoose.model ('buy', buySchema )

module.exports = Buy