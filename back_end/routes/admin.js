const express = require('express')
const router = express.Router()

// get Admin model
const User = require('../models/User')

// get all admins
router.get('/get/all', (req, res) => {
  User.find({}, (err, admins) => {
    if (err) {
      res.status(400).send({ error: 'Users not found' })
    }
    if (admins) {
      res.status(200).json(admins)
    }
  })
})

// get admin by ID
router.get('/get/:userID', (req, res) => {
  let { userID } = req.params
  User.findById({ _id: userID }, (err, user) => {
    if (err) {
      res.status(400).json({ error: 'User not found' })
    } else {
      res.status(200).json(user)
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

// -> Exports the router
module.exports = router
