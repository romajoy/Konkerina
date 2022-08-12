// Needle Log

const mongoose = require('mongoose')

// Match Schema
const needleSchema = new mongoose.Schema({
    // type: {type: String, required: true}, // needle or hook, if hook show size, brand, material?
    size: {type: String, required: true}, // ex. US 6
    brand: {type: String, required: true}, // ex. Chicagoo
    style: {type: String, required: true}, // ex. Circular
    length: {type: Number}, // ex. 16"
    material: {type: String}, // ex. metal, dropdown menu
    point: {type: String}, // ex. lace point, dropdown menu
    setComplete: {type: Boolean}, // yes or no // only show if DPN or Straight
    inUse: {type: Boolean}, // yes or no
    project: {type: String}, // ex. Polyrhythm // only show if inUse is Y
    replace: {type: Boolean}, // want to replace soon
    favorite: {type: Boolean}, // true or false
    misc: {type: String} // ex. not great for socks, best for wool
})

const Needle = mongoose.model('Needle', needleSchema)
module.exports = Needle

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