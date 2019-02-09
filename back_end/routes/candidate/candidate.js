const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User');

// Candidate Register 
// router.post('/register', (req, res) => {
//     const { firstName, lastName, education, occupation, 
//     phoneNumber, linkedIn, dateOfBirth } = req.body

//     User.findOne({email})
//         .then(candidate => {
//             if(candidate) {
//                 return res.status(400).json({email: 'Email is existed'})
//             } else {
//                 const newCandidate = new Candidate({
//                     firstName: firstName,
//                     lastName: lastName,
//                     education: education,
//                     occupation: occupation,
//                     phoneNumber: phoneNumber,
//                     linkedIn: linkedIn,
//                     dateOfBirth: dateOfBirth,
//                     // email: email,
//                     password: password
//                 })
//                 bcrypt.hash(newCandidate.password, 10, (err, hash) => {
//                     // Store hash in your password DB
//                     if(err) {
//                         throw err
//                     }
//                     newCandidate.password = hash
//                     newCandidate.save()
//                         .then(candidate => res.json(candidate))
//                         .catch(err => console.log(err))
//                 })
//             }
//     }).catch(err => console.log(err))
// })

// Get Candidate
router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    User.findById({_id: id}, (err, candidate) => {
        if (err) {
            res.status(400).json({error: "User not found"})
        } else {
            res.json(candidate);
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
            res.json(candidate)
        }
    })
})

// Update Candidate
router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    User.findOne({_id: id}, (err, foundCandidate) => {
        if (err) {
            res.status(400).json({error: "User not found"})
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
                foundCandidate.save((err, candidate) => {
                    if (err) {
                        res.status(400).json({error: "User not found"})
                    } else {
                        res.json(candidate);
                    }
                })
            }
        }
    })
})




module.exports = router;