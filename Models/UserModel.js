const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', Schema);
