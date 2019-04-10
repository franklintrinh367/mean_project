const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// load models
const Job = require('../models/Job')
const User = require('../models/User')

/*// get all Jobs
router.get('/get/all/:userId', async (req, res) => {
  await Job.find({ userId: req.params.userId }, (err, jobs) => {
    if (!err) {
      res.send(jobs)
    } else {
      res.status(400).send({ error: err })
    }
  })
})
*/

// Post the job
router.post('/insert/:token', (req, res) => {
  let token = jwt.decode(req.params.token)
  let userID = token.id
  // Declare the body
  let {
    jobCategory,
    jobTitle,
    jobStatus,
    jobPosition,
    jobEndDate,
    jobDescription,
    jobActivate,
  } = req.body
  // pass the value
  var job = new Job({
    userId: userID,
    jobCategory: jobCategory,
    jobTitle: jobTitle,
    jobStatus: jobStatus,
    jobPostDate: Date.now(),
    jobEndDate: jobEndDate,
    jobPosition: jobPosition,
    jobDescription: jobDescription,
    jobActivate: jobActivate,
  })
  // Check if the user exist in the database
  //save the Schema value into the mongoDB

  console.log(job)

  User.findById(userID)
    .then(job.save())
    .catch(err => res.json(err))
})

// get all Jobs
router.get('/get/all', (req, res) => {
  Job.find({ jobActivate: true }, (err, jobs) => {
    if (err) {
      res.status(400).send({ error: err })
    }
    if (jobs) {
      res.status(200).json(jobs)
    }
  })
})

// get Job by ID
router.get('/getall/:jobId', (req, res) => {
  Job.where('_id')
    .equals(req.params.jobId)
    .where('jobActivate')
    .equals(true)
    .exec((err, docs) => {
      if (!err) {
        res.send(docs)
      } else {
        console.log('Error in Retrieving:' + JSON.stringify(err, undefined, 2))
      }
    })
})

// delete Job
router.delete('/delete/:jobID', (req, res) => {
  // get jobID from url
  var { jobID } = req.params
  Job.findOneAndDelete({ _id: jobID }, (err, job) => {
    if (err) {
      res.status(400).json({ error: 'Job not found' })
    } else {
      res.status(200).json(job)
    }
  })
})

/* UPDATE JOB */
router.put('/updates/:id', function(req, res, next) {
  Job.findByIdAndUpdate(req.params.id, req.body, { upsert: true }, function(
    err,
    jobs
  ) {
    if (err) return next(err)
    res.json(jobs)
  })
})

/* UPDATE JOB */
router.put('/delete/:id', function(req, res, next) {
  Job.findByIdAndUpdate(req.params.id, req.body, { upsert: true }, function(
    err,
    jobs
  ) {
    if (err) return next(err)
    res.json(jobs)
  })
})

// update Job
router.put('/update/:jobID', (req, res) => {
  // get jobID from url
  let { jobID } = req.params

  Job.findOne({ _id: jobID }, (err, job) => {
    if (err) {
      res.status(400).json({ error: err })
    } else {
      if (req.body.jobFirstName) {
        job.JobFirstName = req.body.compJobFirstNameName
      }
      if (req.body.jobLastName) {
        job.JobLastName = req.body.JobLastName
      }
      if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(400).json({ error: err })
          }
          job.password = hash
        })
      }
      job
        .save()
        .then(job => res.status(200).json(job))
        .catch(err => res.status(400).json({ error: err }))
    }
  })
})

// create a Job
router.post('/create', (req, res) => {
  // get key companyID from header
  let companyID = req.get('companyID')

  let {
    jobStatus,
    jobPostDate,
    jobEndDate,
    jobPosition,
    jobDescritpion,
    jobActivate,
    compContact,
    compPhone,
  } = req.body
  let newJob = new Job({
    companyID,
    jobStatus,
    jobPostDate,
    jobEndDate,
    jobPosition,
    jobDescritpion,
    jobActivate,
    compPhone,
    compContact,
    candidatesMatch: [],
  })
  newJob
    .save()
    .then(job => res.status(200).json(job))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router
