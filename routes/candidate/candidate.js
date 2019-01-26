const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Candidate = require('../../../models/Candidate/Candidate');

// Candidate Register 
router.post('/register', (req, res) => {
    const {firstName, lastName, education, occupation, 
    phoneNumber, linkedIn, dateOfBirth, email, password} = req.body

    Candidate.findOne({email})
        .then(candidate => {
            if(candidate) {
                return res.status(400).json({email: 'Email is existed'})
            } else {
                const newCandidate = new Candidate({
                    firstName: firstName,
                    lastName: lastName,
                    education: education,
                    occupation: occupation,
                    phoneNumber: phoneNumber,
                    linkedIn: linkedIn,
                    dateOfBirth: dateOfBirth,
                    email: email,
                    password: password
                })
                bcrypt.hash(newCandidate.password, 10, (err, hash) => {
                    // Store hash in your password DB
                    if(err) {
                        throw err
                    }
                    newCandidate.password = hash
                    newCandidate.save()
                        .then(candidate => res.json(candidate))
                        .catch(err => console.log(err))
                })
            }
    }).catch(err => console.log(err))
})

// Get Candidate
router.get('/get/:id', (req, res) => {
    var id = req.params.id;
    Candidate.findById(id, (err, candidateFound) => {
        if (err) {
            res.status(500).send();
        } else {
            res.json(candidateFound);
        }
    })
})

// Delete Candidate 
router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    Candidate.findOneAndDelete({_id: id}, (err, deletedCandidate) => {
        if (err) {
            res.status(500).send();
        } else {
            res.json(deletedCandidate)
        }
    })
})

// Update Candidate
router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    Candidate.findOne({_id: id}, (err, foundCandidate) => {
        if (err) {
            res.status(500).send();
        } else {
            if(!foundCandidate) {
                res.status(404).send();
            } else {
                if (req.body.firstName) {
                    foundCandidate.firstName = req.body.firstName
                }
                if (req.body.lastName) {
                    foundCandidate.lastName = req.body.lastName
                }
                if (req.body.education) {
                    foundCandidate.education = req.body.education
                }
                if (req.body.occupation) {
                    foundCandidate.occupation = req.body.occupation
                }
                if (req.body.phoneNumber) {
                    foundCandidate.phoneNumber = req.body.phoneNumber
                }
                if (req.body.linkedIn) {
                    foundCandidate.linkedIn = req.body.linkedIn
                }
                if (req.body.dateOfBirth) {
                    foundCandidate.dateOfBirth = req.body.dateOfBirth
                }
                if (req.body.email) {
                    foundCandidate.email = req.body.email
                }
                if (req.body.password) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if(err) {
                            throw err
                        }
                        foundCandidate.password = hash
                    })
                }
                foundCandidate.save((err, updatedCandidate) => {
                    if (err) {
                        res.status(500).send();
                    } else {
                        res.json(updatedCandidate);
                    }
                })
            }
        }
    })
})




module.exports = router;