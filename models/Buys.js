  
const mongoose = require ('mongoose')

const buySchema = new mongoose.Schema({
        products:[{type:Object, required:true}],
        userId:{type: mongoose.Types.ObjectId, ref: 'user', required:true},
        date:{type:String, required:true},
        deliverInformation:[{type:Object , required:true}],
        totalPrice:{type:Number, required: true},
})

const Buy = mongoose.model ('buy', buySchema )

module.exports = Buy