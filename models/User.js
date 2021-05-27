  
const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
        userName:{type:String, required:true},
        birthDate:{type:String, required:true},
        email:{type:String, required:true},
        password:{type:String, required:true},
        // avatar:{type: File , required:true},
        favouritesList:[{gameId:{type: mongoose.Types.ObjectId, ref: 'game', default:0},productId:{type: mongoose.Types.ObjectId, ref: 'hardware', default:0}}],
        adquiredList:[{gameId:{type: mongoose.Types.ObjectId, ref: 'game', default:0},productId:{type: mongoose.Types.ObjectId, ref: 'hardware', default:0}}],     
        friends:[{type: mongoose.Types.ObjectId, ref: 'user', default: 0}],
        chats:[{type: mongoose.Types.ObjectId, ref: 'chat', default: 0}],
        rol:{type:String, default: 'user'},
        country:{type:String, required: true},
})

const User = mongoose.model ('user', userSchema )

module.exports = User