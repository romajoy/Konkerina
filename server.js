//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Meet = require ('./models/schema.js');
const Seed = require('./models/seed.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config();
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

// Delete - DELETE - / dates / :id
app.delete('/dates/:id', (req, res) => {
    Meet.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/dates')
    })
})

// Index - GET - / dates
app.get('/dates', (req, res) => {
    Meet.find({}, (err, dateData) => {
        res.render('index.ejs', {
            date:dateData
    })
    })
})

// New - GET - / dates / new
app.get('/dates/new', (req, res) => {
    res.render('new.ejs')
})

// Seed - GET - / dates / seed
app.get('/dates/seed', (req, res) => {
    Meet.create(Seed, (err, data) => {
        if (err) console.log(err.message)
        console.log('Dates added to log!')
    })
    res.redirect('/dates')
})

// Edit - GET - / dates / :id / edit
app.get('/dates/:id/edit', (req, res) => {
    Meet.findById(req.params.id, (err, foundMeet) => {
    res.render('edit.ejs', {
        date:foundMeet
        })
    })
})

// Show - GET - / dates / :id
app.get('/dates/:id', (req, res) => {
    Meet.findById (req.params.id, (err, found) => {
        res.render('show.ejs', {
        date: found
        })
    })
})


// Create - POST / dates / 
app.post('/dates', (req, res) => {
    if(req.body.wouldDateAgain === 'on') {
        req.body.wouldDateAgain = true;
    } else {
        req.body.wouldDateAgain = false
    }
    Meet.create(req.body, (err, newDate) => {
        res.redirect('/dates')
    })
})

// Update - PUT / dates / :id
app.put('/dates/:id', (req, res) => {
    if(req.body.wouldDateAgain === 'on') {
        req.body.wouldDateAgain = true;
    } else {
        req.body.wouldDateAgain = false
    }
    Meet.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, update) => {
        res.redirect('/dates')
    })
})


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

