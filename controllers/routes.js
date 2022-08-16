const express = require('express')
const router = express.Router()
const Match = require('../models/schema.js')
const seedMatches = require('../models/seed.js')
const Date = require('../models/dates.js')

// New - GET / matches / new
router.get('/matches/new', (req, res) => {
    res.render('new.ejs')
    }) 

// Edit - GET / matches / :id / edit
router.get('/matches/:id/edit', (req, res) => {
    Match.findById(req.params.id, (err, foundMatch) => {
        res.render('edit.ejs', {match: foundMatch})
    })
})

// Seed - GET / matches / seed
router.get('/matches/seed', (req, res) => {
    Match.create(seedMatches, (err, data) => {
        if (err) console.log(err.message)
        console.log('Match Added!')
    })
    res.redirect('/matches')
})

// Update - PUT / matches / :id
router.put('/matches/:id', (req, res) => {
    Match.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMatch) => {
        res.redirect('/matches')
    })
})
// Show - GET / matches / :id
router.get('/matches/:id', (req, res) => {
    Match.findById(req.params.id, (err, showMatch) => {
        res.render(
        'show.ejs', 
        {
            match:showMatch
        })
    })
})

// Delete - / matches / :id
router.delete('/matches/:id', (req, res) => {
    Match.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/matches')
    })
})

router.delete('/:id', (req, res)=> {
    Match.findByIdAndRemove(req.params.id, (err, foundMatch) => {
        const dateIds = [];
        for (let i = 0; i < foundMatch.outing.length; i++) {
            dateIds.push(foundMatch.outing[i]._id)
        }
        Date.remove(
            {
                _id: {
                    $in: dateIds
                }
            }, 
            (err, data) => {
                res.redirect('/matches')
            }
        )
    })
})

// Create - POST / matches
router.post('/matches/', (req, res) => {
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
router.get('/matches', (req, res) => {
    Match.find({}, (err, matchData) => {
        res.render(
        'index.ejs', 
        {
        match: matchData
        })
    })
})

module.exports = router
