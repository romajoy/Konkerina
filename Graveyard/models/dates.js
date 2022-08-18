const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema ({
    match: {type: String, required:true}, // [Match.schema]
    when: {type: Date, required:true},
    where: {type: String},
    thoughts: {type: String},
    matchedOn: {type: String},
    wouldDateAgain: {type: Boolean}
})


const Meet = mongoose.model('Date', dateSchema)
module.exports = Meet