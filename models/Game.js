const mongoose = require('mongoose')

function toLower(value) {
    return value.toLowerCase();
}

const gameSchema = new mongoose.Schema({
    title: { type: String, required: true, set: toLower },
    year: { type: Number, required: true },
    genre: [{ type: String, required: true }],
    language: [{ type: String, required: true }],
    developer: { type: String, required: true },
    online: { type: Boolean, required: true },
    platform: [{ type: String, required: true }],
    price: { type: Number, required: true },
    description: { type: String, required: true },
    discount: { type: Number, default: 0 },
    DLC: [{ name: { type: String, required: true }, price: { type: Number, required: true }, description: { type: String, required: true } }],
    valoration: [{ good: { type: Boolean, required: true }, commentary: { type: String, default: "" }, userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true } }],
    imageBanner: { type: String, required: true },
    imagesBackground: [{ type: String, required: true }],
    PEGI: { type: Number, required: true },
    virtual: { type: Boolean, default: true },

})

const Game = mongoose.model('game', gameSchema)

module.exports = Game