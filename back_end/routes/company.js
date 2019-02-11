const express = require('express')
const router = express.Router()

// load models
const User = require('../models/User')
const Job = require('../../models/Job')

// get all companies
router.get('/get/all', (req, res) => {
  User.find({ role: 'company' }, (err, companies) => {
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
    .exec((err, job) => {
      if (err) {
        res.status(400).json({ error: err })
      } else {
        res.status(200).json(job)
      }
    })
})

module.exports = router
