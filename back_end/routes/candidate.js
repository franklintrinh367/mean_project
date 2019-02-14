const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// load models
const User = require('../models/User')
const Job = require('../models/Job')
const Candidate = require('../models/Candidate')

// Add new Candidate
router.post('/register', (req, res) => {
  let newCandidate = new Candidate({
    canId: req.body.canId,
    canFirstName: req.body.canFirstName,
    canLastName: req.body.canLastName,
    canEducation: req.body.canEducation,
    canActualJob: req.body.canActualJob,
    canPhone: req.body.canPhone,
    canLink: req.body.canLink,
    canResume: req.body.canResume,
    canAddress: req.body.canAddress,
    canCity: req.body.canCity,
    canProvince: req.body.canProvince,
    canPostalCode: req.body.canPostalCode,
  })
  newCandidate
    .save()
    .then(candidate => {
      console.log(req.body.canId)
      User.findByIdAndUpdate(req.body.canId, {
        completed: true,
      }).then(console.log('completed registration'))
      res.json(candidate)
    })
    .catch(err => res.json(err))
})

// Get all Candidates
router.get('/get/all', (req, res) => {
  User.find({ role: 'candidate' }, (err, candidates) => {
    if (err) {
      res.status(400).send({ error: 'Candidate not found' })
    }
    if (candidates) {
      res.status(200).json(candidates)
    }
  })
})

// Get Candidate by ID
router.get('/get/:candidateID', (req, res) => {
  let { candidateID } = req.params
  User.findById({ _id: candidateID }, (err, candidate) => {
    if (err) {
      res.status(400).json({ error: 'Candidate not found' })
    } else {
      res.status(200).json(candidate)
    }
  })
})

// Update Candidate
router.put('/update/:candidateID', (req, res) => {
  var { candidateID } = req.params
  User.findOne({ _id: candidateID }, (err, candidate) => {
    if (err) {
      res.status(400).json({ error: 'User not found' })
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
          if (err) {
            throw err
          }
          candidate.password = hash
        })
      }
      candidate
        .save()
        .then(user => res.status(200).json(candidate))
        .catch(err => res.status(400).json({ err: err }))
    }
  })
})

// apply for a job
router.post('/apply/:jobID', (req, res) => {
  // get jobID from url
  let { jobID } = req.params
  // get candidateID from header
  let candidateID = req.get('candidateID')

  Job.findById({ _id: jobID })
    .then(job => {
      job.candidatesMatch.unshift(candidateID)
      job.save().then(job => res.status(200).json(job))
    })
    .catch(err => res.status(400).json({ error: err }))

  User.findById({ _id: candidateID })
    .then(candidate => {
      candidate.details.appliedJobs.unshift(jobID)
      candidate.save().then(candidate => res.status(200).json(candidate))
    })
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router
