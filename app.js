const express = require('express');
const mongoose = require('mongoose');
const { mongoUser, mongoPass } = require('./config');

// mongoose setup
mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0.zxi50.mongodb.net/expenses_tracker?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) {
        console.log(err.message);
    } else {
        console.log('Connected to database');
    }
})

// Routes
const UserRoutes = require('./Routes/UserRouter');
const ExpenseRoutes = require('./Routes/ExpenseRouter');

const app = express();

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Content-Type');
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/user', UserRoutes)
app.use('/api/expense', ExpenseRoutes)

module.exports = app;