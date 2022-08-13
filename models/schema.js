// Dating Log App (name TBD) // Graft paper

const mongoose = require('mongoose')

// Match Schema
const matchSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    neighborhood: {type: String, required: true},
    matchedOn: {type: String, required: true},
    dates: [{
        when: Date,
        where: String,
        thoughts: String,
    }],
    wouldDateAgain: Boolean
})

const Match = mongoose.model('Match', dateSchema)
module.exports = Match

// Workflow:
// - Add New Match
// - Add Dates to a Match
// - Edit/Update Dates & Match
// 
// Stretch Goals:
// - Controllers
// - Partials
// - CSS Frameworks
// 
// Extra Stretch Goals:
// - Create Log-in and scale to allow users to creat their own Dating Logs
//
// Further down the road:
// - incorporate google maps for date location
//
// Project Timeline:
// Friday: build out JS & EJS & seed data
// Weekend: build out 7 restful routes
// Monday: partials, controllers & CSS frameworks
// Tuesday: CSS frameworks (if finished, work on log-in feature)
// Wednesday: (if finished... work on log-in feature)