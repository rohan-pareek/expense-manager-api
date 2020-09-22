const Expense = require('../Models/ExpenseModel');
const mongoose = require('mongoose')

exports.addExpense = (req, res) => {
    const expense = new Expense({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        category: req.body.category,
        type: req.body.type,
        amount: req.body.amount,
        comment: req.body.comment,
        createdOn: new Date()
    })
    expense.save((err, doc) => {
        if(err) {
            res.json({
                statusCode: 0,
                statusMessage: err.message
            })
        } else {
            res.json({
                statusCode: 1,
                statusMessage: 'Successfully added expense'
            })
        }
    })
}

exports.fetchExpenses = (req, res) => {
    Expense.find({userID: req.body.userID}, (err, doc) => {
        if(err) {
            res.json({
                statusCode: 0,
                statusMessage: err.message
            })
        } else {
            res.json({
                statusCode: 1,
                statusMessage: 'Successfully fetched expenses',
                data: doc
            })
        }
    })
}