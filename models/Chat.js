const mongoose = require ('mongoose')

const chatSchema = new mongoose.Schema({
        userId1:{type: mongoose.Types.ObjectId, ref: 'user', required:true},
        userId2:{type: mongoose.Types.ObjectId, ref: 'user', required:true},
        messages:[{type: String, default:0}],     
})

const Chat = mongoose.model ('chat', chatSchema )

module.exports = Chat