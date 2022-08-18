const express = require('express')
const router = express.Router()
const Match = require('../models/schema.js')
const Date = require('../models/dates.js')
const seedMatches = require('../models/seed.js')
const seedDates = require('../models/dateseed.js')


// New - GET / dates / new
router.get('/new', (req, res) => {
    Match.find({}, (err, allMatches) => {
        res.render('dates/datenew.ejs', {
            match: allMatches
        })
    })
})

// Delete - / dates / :id

router.delete('/:id', (req, res) => {
    Date.findByIdAndRemove(req.params.id, (err, foundDate) => {
        Match.findOne({'date._id':req.params.id}, (err, foundMatch) => {
            foundMatch.outing.id(req.params.id).remove()
            foundMatch.save((err, data) => {
                res.redirect('/dates')
            })
        })
    })
})

// Seed - GET / dates / seed
router.get('/seed', (req, res) => {
    Date.create(seedDates, (err, data) => {
        if (err) console.log(err.message)
        console.log('Dates added!')
    })
    res.redirect('/dates')
})

// Index - GET / dates

router.get('/', (req, res) => {
    Date.find({}, (err, foundDates) => {
        res.render('dates/dateindex.ejs', {
            date:foundDates
        })
    })
})

// Edit - GET / dates / :id / edit
router.get('/:id/edit', (req, res) => {
    Date.findById(req.params.id, (err, dateToEdit) => {
        Match.find({}, (err, allMatches) => {
            Match.findOne({'date._id':req.params.id}, (err, foundDateMatch) => {
                res.render('dates/dateedit.ejs', {
                    date: dateToEdit,
                    match: allMatches,
                    dateMatch: foundDateMatch
                })
            })
        })
    })
})

// Show - GET / dates / :id

router.get('/:id', (req, res) => {
    Date.findById(req.params.id, (err, dateFound) => {
        Match.findOne({'match._id':req.params.id}, (err, foundMatch) => {
            res.render('dates/dateshow.ejs', {
                match: foundMatch,
                date: dateFound
            })
        })
    })
})



// Create - POST / dates

router.post('/', (req, res) => {
    Match.findById(req.body.matchId, (err, foundMatch) => {
        Date.create(req.body, (err, createdDate) => {
            foundMatch.outing.push(createdDate)
            foundMatch.save((err, data) => {
            })
        })
    })
    res.redirect('/dates')
})

// Update - PUT / dates / :id (WITH MATCHES)

router.put('/:id', (req, res) => {
    Date.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedDate) => {
        Match.findOne({'date._id':req.params.id}, (err, foundMatch) => {
            if (foundMatch._id.toString() !== req.body.matchId) {
                foundMatch.outing.id(req.params.id).remove();
                foundMatch.save((err, savedFoundMatch)=> {
                    Match.findById(req.body.matchId, (err, newMatch) => {
                        newMatch.outing.push(updatedDate);
                        newMatch.save((err, savedNewMatch) => {
                            res.redirect('/dates/'+req.params.id);
                        });
                    });
                });
            } else {
                foundMatch.outing.id(req.params.id).remove();
                foundMatch.outing.push(updatedDate);
                foundMatch.save((err, data)=> {
                    res.redirect('/dates/'+req.params.id);
                });
            }
        });
    });
});

module.exports = router