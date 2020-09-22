const User = require('../Models/UserModel');
const mongoose = require('mongoose');
const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config');

exports.signup = (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        password: hash.generate(req.body.password)
    })
    User.findOne({userID: req.body.userID}, (err, doc) => {
        if(err) {
            res.json({
                statusCode: 0,
                statusMessage: err.message
            })
        } else if(doc) {
            res.json({
                statusCode: 0,
                statusMessage: 'User already exists'
            })
        } else {
            user.save((err) => {
                if(err) {
                    res.json({
                        statusCode: 0,
                        statusMessage: err.message
                    })
                } else {
                    res.json({
                        statusCode: 1,
                        statusMessage: 'Account created successfully'
                    })
                }
            })
        }
    })
}

exports.login = (req, res) => {
    User.findOne({ userID: new RegExp(req.body.userID, 'ig')}, (err, user) => {
        if(err) {
            res.json({
                statusCode: 0,
                statusMessage: err.message
            })
        } else if(!user) {
            res.json({
                statusCode: 0,
                statusMessage: 'User not found'
            })
        } else {
            if(hash.verify(req.body.password, user.password)) {
                jwt.sign({userID: req.body.userID}, jwtSecretKey, {}, (err, token) => {
                    if(err) {
                        res.json({
                            statusCode: 0,
                            statusMessage: err.message
                        })
                    } else {
                        res.json({
                            statusCode: 1,
                            statusMessage: 'Logged in successfully',
                            data: {
                                token,
                                userID: req.body.userID
                            }
                        })
                    }
                })
            } else {
                res.json({
                    statusCode: 0,
                    statusMessage: 'Invalid Password'
                })
            }
        }
    })
}
