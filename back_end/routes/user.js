const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Get the secret key
const secretOrKey = require('../config/keys').secretOrKey

// Load models
const User = require('../models/User')
const Candidate = require('../models/Candidate')
const Company = require('../models/Company')
const Admin = require('../models/Admin')

// User Register
router.post('/register', (req, res) => {
  // get field input
  const { email, password, username, activated, role } = req.body
  // instantiate details field
  let details = {}
  // get params from role candidate
  if (role == 'candidate') {
    let {
      canFirstName,
      canLastName,
      canEducation,
      canOccupation,
      canPhone,
      canLinkedIn,
      canAddress,
      canCity,
      canProvince,
      canPostalCode,
      canAllocateStatus,
    } = req.body
    details = new Candidate({
      canFirstName,
      canLastName,
      canEducation,
      canOccupation,
      canPhone,
      canLinkedIn,
      // resume,
      canAddress,
      canCity,
      canProvince,
      canPostalCode,
      canAllocateStatus,
      appliedJobs: [],
    })
  }
  // get params from role company
  if (role == 'company') {
    let {
      compName,
      compCRANumber,
      compAddress,
      compCity,
      compCode,
      compPhone,
      compContact,
      compProvince,
    } = req.body
    details = new Company({
      compName,
      compCRANumber,
      compAddress,
      compCity,
      compCode,
      compProvince,
      compPhone,
      compContact,
    })
  }

  // get params from role admin
  if (role == 'admin') {
    let { adminFirstName, adminLastName } = req.body
    details = new Admin({
      adminFirstName,
      adminLastName,
    })
  }

  const newUser = new User({
    email,
    password,
    username,
    activated,
    role,
    details,
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

// get all users
router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(400).send({ error: err })
    }
    if (users) {
      res.status(200).json(users)
    }
  })
})

//sendEmail
router.get('/send/:id&:email', async (req, res) => {
  //create new hash refers to user's id
  let id = req.params.id
  let email = req.params.email
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(id, salt, (err, hash) => {
      //***important line, don't change this, sometimes bcrypt produces hash with
      //slash which will break the url
      hash = hash.replace(/\//g, '.')

      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        sercure: false,
        auth: {
          user: 'qmd7pribn7xbj2qv@ethereal.email',
          pass: 'CPMw2sRq3emkAKGmNr',
        },
      })

      let msg =
        'Welcome to JC Consulting, here is the invitation link:\n' +
        `http://localhost:3000/user/verify/${hash}`

      let mailOptions = {
        from: 'qmd7pribn7xbj2qv@ethereal.email',
        to: email,
        subject: 'Welcome to JC-Consulting',
        text: msg,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        console.log(info)
        User.findByIdAndUpdate(id, {
          $set: {
            hash: hash,
          },
        })
          .then()
          .catch(err => console.log(err))
      })
    })
  })
})

//verify email
router.get('/verify/:hash', (req, res) => {
  const hash = req.params.hash
  User.findOneAndUpdate(
    hash,
    {
      activated: true,
    },

    { returnNewDocument: true }
  ).then(() => res.redirect(`http://localhost:4200/success/${hash}`))
})

//find user By ID
router.get('/findUserByHash/:hash', (req, res) => {
  let hash = req.params.hash
  User.findOneAndUpdate(hash, {
    $unset: {
      hash: '',
    },
  })
    .then(user => {
      res.json(user)
    })
    .catch(err => console.log(err))
})

//Look for existing email or username
router.get('/find/:obj', (req, res) => {
  let obj = req.params.obj
  User.findOne({
    $or: [{ email: obj }, { username: obj }],
  })
    .then(result => {
      res.json(result)
    })
    .catch(err => console.log(err))
})

// User Login
router.post('/login', (req, res) => {
  const { inputLogin, password } = req.body

  User.findOne()
    .or([{ email: inputLogin }, { username: inputLogin }])
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'Username or email cannot be found' })
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              username: user.username,
            }
            // set token
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: token,
                })
              }
            )
          } else {
            return res.status(400).json({ msg: 'Invalid username or password' })
          }
        })
      }
    })
    .catch(err => {
      return res.status(400).json(err)
    })
})

//Delete All, for testing purpose only. Can be deleted
router.delete('/delete', (res, req) => {
  User.deleteMany({})
    .then(info => {
      res.json(info)
    })
    .catch(err => res.json(err))
})

module.exports = router
