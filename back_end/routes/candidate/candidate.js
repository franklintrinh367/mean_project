const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// get User model
const User = require('../../models/User');
// get Job model
const Job = require('../../models/company/Job')
// get Candidate model
const Candidate = require('../../models/candidate/Candidate')

// Get all Candidates
router.get('/get/all', (req, res) => {
    User.find({role: 'candidate'}, (err, candidates) => {
        if(err){
            res.status(400).send({error: "Candidate not found"})
        }
        if(candidates){
            res.status(200).json(candidates)
        }
    })
})

// Get Candidate by ID
router.get('/get/:candidateID', (req, res) => {
    let {candidateID} = req.params;
    User.findById({_id: candidateID}, (err, candidate) => {
        if (err) {
            res.status(400).json({error: "Candidate not found"})
        } else {
            res.status(200).json(candidate)
        }
    })
})

// Update Candidate
router.put('/update/:candidateID', (req, res) => {
    var {candidateID} = req.params;
    User.findOne({_id: candidateID}, (err, candidate) => {
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
                .then(user => res.status(200).json(candidate))
                .catch(err => res.status(400).json({err: err}))
        }
    })
})

// apply for a job
router.post('/apply/:jobID', (req, res) => {
    // get jobID from url
    let { jobID } = req.params
    // get candidateID from header
    let candidateID = req.get('candidateID')

    Job.findById({_id: jobID})
        .then(job => {
            job.candidatesMatch.unshift(candidateID)
            job.save().then(job => res.status(200).json(job))
        })
        .catch(err => res.status(400).json({error: err}))
    
    User.findById({_id: candidateID})
        .then(candidate => {
            candidate.details.appliedJobs.unshift(jobID)
            candidate.save().then(candidate => res.status(200).json(candidate))
        })
        .catch(err => res.status(400).json({error: err}))
})

module.exports = router;