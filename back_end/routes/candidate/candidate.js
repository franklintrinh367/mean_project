const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User');

// Get all Candidates
router.get('/get/all', (req, res) => {
    User.find({role: 'candidate'}, (err, candidates) => {
        if(err){
            res.status(400).send({error: err})
        }
        if(candidates){
            res.status(200).json(candidates)
        }
    })
})

// Get Candidate by ID
router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    User.findById({_id: id}, (err, candidate) => {
        if (err) {
            res.status(400).json({error: "User not found"})
        } else {
            res.status(200).json({candidate: candidate})
        }
    })
})

// Delete Candidate 
router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, (err, candidate) => {
        if (err) {
            res.status(400).json({error: "User not found"})
        } else {
            res.status(200).json({candidate: candidate})
        }
    })
})

// Update Candidate
router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    User.findOne({_id: id}, (err, candidate) => {
        if (err) {
            res.status(400).json({error: "User not found"})
        } else {
            if (req.body.firstName) {
                candidate.firstName = req.body.firstName
            }
            if (req.body.lastName) {
                candidate.lastName = req.body.lastName
            }
            if (req.body.education) {
                candidate.education = req.body.education
            }
            if (req.body.occupation) {
                candidate.occupation = req.body.occupation
            }
            if (req.body.phoneNumber) {
                candidate.phoneNumber = req.body.phoneNumber
            }
            if (req.body.linkedIn) {
                candidate.linkedIn = req.body.linkedIn
            }
            if (req.body.dateOfBirth) {
                candidate.dateOfBirth = req.body.dateOfBirth
            }
            if (req.body.email) {
                candidate.email = req.body.email
            }
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        throw err
                    }
                    candidate.password = hash
                })
            }
            candidate.save()
                .then(user => res.status(200).json({user: user}))
                .catch(err => res.status(400).json({err: err}))
        }
    })
})

module.exports = router;