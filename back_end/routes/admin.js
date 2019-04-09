const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// get Admin model
const User = require('../models/User')
// const Company = require('../models/Company')
// const Admin = require('../models/Admin')

// get all admins
router.get('/en/get/all', (req, res) => {
  User.find({ activated: true }, (err, admins) => {
    if (err) {
      res.status(400).send({ error: 'Admin not found' })
    }
    if (admins) {
      res.status(200).json(admins)
    }
  })
})

// get all usersby id - For Admin
router.get('/get/:userId', (req, res) => {
  User.find({ activated: true }, (err, users) => {
    if (err) {
      res.status(400).send({ error: err })
    }
    if (users) {
      res.status(200).json(users)
    }
  })
})

// post users

router.post('/users', (req, res) => {
  // get field input
  const { email, password, username, activated, role } = req.body
  // instantiate details field
  let details = {}
  let completed = true

  //visit count
  let visited = 0

  const newUser = new User({
    email,
    password,
    username,
    activated,
    visited,
    role,
    details,
    completed,
  })
  //Hash password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        throw err
      }
      newUser.password = hash
      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
    })
  })
})

// get all admins
router.get('/get/all/company', (req, res) => {
  User.find({ role: 'Company' }, 'details', (err, company) => {
    if (err) {
      res.status(400).send({ error: 'No Company' })
    }
    if (company) {
      res.status(200).json(company)
    }
  })
})

// get admin by ID
router.get('/get/:adminID', (req, res) => {
  let { adminID } = req.params
  User.findById({ _id: adminID }, (err, admin) => {
    if (err) {
      res.status(400).json({ error: 'Admin not found' })
    } else {
      res.status(200).json(admin)
    }
  })
})

// update admin
router.put('/update/:adminID', (req, res) => {
  var { adminID } = req.params
  User.findOne({ _id: adminID }, (err, admin) => {
    if (err) {
      res.status(400).json({ error: 'Admin not found' })
    } else {
      if (req.body.adminFirstName) {
        admin.adminFirstName = req.body.compadminFirstNameName
      }
      if (req.body.adminLastName) {
        admin.adminLastName = req.body.adminLastName
      }
      if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(400).json({ error: err })
          }
          admin.password = hash
        })
      }
      admin
        .save()
        .then(admin => res.status(200).json(admin))
        .catch(err => res.status(400).json({ error: err }))
    }
  })
})

router.put('/en/update/:userId', async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { upsert: true },
    (err, user) => {
      if (err) return next(err)
      res.json(user)
    }
  )
})

router.put('/en/delete/:userId', async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    { upsert: true },
    (err, user) => {
      if (err) return next(err)
      res.json(user)
    }
  )
})

// -> Exports the router
module.exports = router
