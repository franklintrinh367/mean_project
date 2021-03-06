const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const docx = require('../helper/genDocx')

// Get the secret key
const secretOrKey = require('../config/keys').secretOrKey

// load models
const User = require('../models/User')
const Job = require('../models/Job')
const Candidate = require('../models/Candidate')

// Add new Candidate
router.post('/register/:token', (req, res) => {
  let token = jwt.decode(req.params.token)
  let userID = token.id

  let newCandidate = new Candidate({
    canAvatar: req.body.canAvatar,
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

  User.findById(userID)
    .then(user => {
      user.details = newCandidate
      user
        .save()
        .then(savedUser => {
          const payload = {
            id: savedUser.id,
            email: savedUser.email,
            username: savedUser.username,
            visited: savedUser.visited,
            role: savedUser.role,
            completed: savedUser.completed,
            details: savedUser.details,
          }
          // set token
          jwt.sign(
            payload,
            secretOrKey,
            { expiresIn: 60 * 60 * 24 },
            (err, token) => {
              res.json({
                success: true,
                token: token,
              })
            }
          )
        })
        .catch(err => console.log(err))
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
router.put('/update/:token', (req, res) => {
  let token = jwt.decode(req.params.token)
  let userID = token.id

  let newCandidate = new Candidate({
    canAvatar: req.body.canAvatar,
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
  console.log(newCandidate)
  User.findById(userID)
    .then(user => {
      user.details = newCandidate
      user.save().then(() => {
        const payload = {
          id: userID,
          email: token.email,
          username: token.username,
          role: token.role,
          completed: token.completed,
          details: newCandidate,
        }

        // Set token
        jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: token,
          })
        })
      })
    })
    .catch(err => res.json(err))
})

// apply for a job
router.post('/apply', (req, res) => {
  console.log(req.body)
  // get jobID from url
  // let { jobID } = req.params
  // get candidateID from header
  // let candidateID = req.get('candidateID')

  // Job.findById({ _id: jobID })
  //   .then(job => {
  //     job.candidatesMatch.unshift(candidateID)
  //     job.save().then(job => res.status(200).json(job))
  //   })
  //   .catch(err => res.status(400).json({ error: err }))

  // User.findById({ _id: candidateID })
  //   .then(candidate => {
  //     candidate.details.appliedJobs.unshift(jobID)
  //     candidate.save().then(candidate => res.status(200).json(candidate))
  //   })
  //   .catch(err => res.status(400).json({ error: err }))
})

//function for generating docx
router.post('/genDocx', (req, res) => {
  let { education, experience, generalInfo, profile } = req.body

  docx.createResume(education, experience, generalInfo, profile)

  res.send(true)
})

module.exports = router
