const mongoose = require('mongoose')

const dateSchema = new mongoose.Schema ({
    when: {type: Date},
    where: {type: String},
    thoughts: {type: String}
})


const Meet = mongoose.model('Date', dateSchema)
module.exports = Meet