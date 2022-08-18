const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema({
    name: {type: String, required: true}, // Name of your date
    matchedOn: {type: String},  // What app matched you
    when: {type: Date, required: true}, // When you went out on your date
    where: {type: String}, // Where you went on your date
    wouldDateAgain: {type: Boolean}, // If you'd go out with them again
    thoughts: {type: String} // Thoughts about your date
})

const Meet = mongoose.model('Date', dateSchema)
module.exports = Meet;