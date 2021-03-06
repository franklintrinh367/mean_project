const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// load models
const User = require('../models/User')
const Job = require('../models/Job')
const Company = require('../models/Company')

// get all companies
// Talk Abdal about Role:
router.get('/get/all', (req, res) => {
  User.find({ role: 'Company' }, (err, companies) => {
    if (err) {
      res.status(400).send({ error: err })
    }
    if (companies) {
      res.status(200).json(companies)
    }
  })
})

// get company by ID
router.get('/get/:companyID', (req, res) => {
  let { companyID } = req.params

  User.findById({ _id: companyID }, (err, company) => {
    if (err) {
      res.status(400).json({ error: 'Company not found' })
    } else {
      res.status(200).json(company)
    }
  })
})

// Post the new users
// Add new Candidate
router.post('/register/:token', (req, res) => {
  let token = jwt.decode(req.params.token)
  let userID = token.id

  let {
    compName,
    compCRANumber,
    compAddress,
    compCode,
    compCity,
    compPhone,
    compContact,
    userId,
    compProvince,
  } = req.body

  var client = new Company({
    compName: compName,
    compCRANumber: compCRANumber,
    compAddress: compAddress,
    compCity: compCity,
    compCode: compCode,
    compProvince: compProvince,
    compPhone: compPhone,
    compContact: compContact,
    userId: userId,
  })

  User.findById(userID)
    .then(user => {
      user.details = client
      user.save()
    })
    .catch(err => res.json(err))
})

// update company
router.put('/update/:companyID', (req, res) => {
  let { companyID } = req.params

  User.findOne({ _id: companyID }, (err, company) => {
    if (err) {
      res.status(400).json({ error: 'Company not found' })
    } else {
      if (req.body.compName) {
        company.compName = req.body.compName
      }
      if (req.body.compCRANumber) {
        company.compCRANumber = req.body.compCRANumber
      }
      if (req.body.compAddress) {
        company.compAddress = req.body.compAddress
      }
      if (req.body.compCity) {
        company.compCity = req.body.compCity
      }
      if (req.body.compCode) {
        company.compCode = req.body.compCode
      }
      if (req.body.compProvince) {
        company.compProvince = req.body.compProvince
      }
      if (req.body.compPhone) {
        company.compPhone = req.body.compPhone
      }
      if (req.body.compContact) {
        company.compContact = req.body.compContact
      }
      if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(400).json({ error: err })
          }
          company.password = hash
        })
      }
      company
        .save()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(400).json({ error: err }))
    }
  })
})

// get all the jobs created by company
router.get('/jobs', (req, res) => {
  let companyID = req.get('companyID')
  Job.find({ companyID: companyID })
    .populate('candidatesMatch')
    .exec((err, jobs) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        res.status(200).json(jobs)
      }
    })
})

// check whether the clients has finish the register
router.get('company/:userId', (req, res) => {})
module.exports = router
