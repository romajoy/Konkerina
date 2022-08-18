const express = require('express')
const router = express.Router()
const Match = require('../models/schema.js')
const Date = require('../models/dates.js')
const seedMatches = require('../models/seed.js')
const seedDates = require('../models/dateseed.js')


// New - GET / dates / new


// Delete - / dates / :id


// Seed - GET / dates / seed


// Index - GET / dates


// Edit - GET / dates / :id / edit


// Show - GET / dates / :id


// Create - POST / dates


// Update - PUT / dates / :id (WITH MATCHES)


module.exports = router