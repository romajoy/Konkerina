//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const Match = require('./models/schema.js');
const seedDates = require ('./models/seed.js');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
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

// New - GET / matches / new
app.get('/matches/new', (req, res) => {
  res.render('new.ejs')
}) 


// Edit - GET / matches / :id / edit
app.get('/matches/:id/edit', (req, res) => {
  Match.findById(req.params.id, (err, foundMatch) => {
    res.render('edit.ejs', {match: foundMatch})
  })
})

// Seed - GET / matches / seed
app.get('/matches/seed', (req, res) => {
  Match.create(seedDates, (err, data) => {
    if (err) console.log(err.message)
    console.log('Match Added!')
  })
  res.redirect('/matches')
})

// Update - PUT / matches / :id
app.put('/matches/:id', (req, res) => {
  Match.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMatch) => {
    res.redirect('/matches')
  })
})

// Show - GET / matches / :id
app.get('/matches/:id', (req, res) => {
  Match.findById(req.params.id, (err, showMatch) => {
    res.render(
      'show.ejs', 
      {
        match:showMatch
      })
  })
})

// Delete - / matches / :id
app.delete('/marns/:id', (req, res) => {
  Match.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/matches')
  })
})



// Create - POST / matches
app.post('/matches/', (req, res) => {
  if (req.body.wouldDateAgain === 'on') {
    req.body.wouldDateAgain = true;
  } else {
    req.body.wouldDateAgain = false;
  }
  Match.create(req.body, (err, newMatch) => {
    res.redirect('/matches')
  })
})


// Index - GET / matches
app.get('/matches', (req, res) => {
  Match.find({}, (err, matchData) => {
    res.render(
      'index.ejs', 
      {
      match: matchData
    })
  })
})

// app.get('/matches' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));

