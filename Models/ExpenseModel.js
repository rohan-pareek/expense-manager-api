const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    amount: {
        type: Number,
        required: true
    },
    comment: {
        type: String
    },
    createdOn: {
        type: Date
    }
})

module.exports = mongoose.model('Expense', Schema);
