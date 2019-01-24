const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const Candidate = require('../../models/Candidate');

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

module.exports = router;