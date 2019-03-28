const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

// Get the secret key
const secretOrKey = require('../config/keys').secretOrKey
// nodemailer setup variables
const jc_email = 'jc-consulting@mail.com'
const jc_pass = 'computerprograming'
const jc_host = 'smtp.mail.com'
const jc_port = 587

// Load models
const User = require('../models/User')
const Feedback = require('../models/Feedback')

// User Register
router.post('/register', (req, res) => {
  // get field input
  const { email, password, username, activated, role } = req.body
  // instantiate details field
  let details = {}
  let completed = false

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
        host: jc_host,
        port: jc_port,
        sercure: false,
        auth: {
          user: jc_email,
          pass: jc_pass,
        },
      })

      let msg =
        'Welcome to JC Consulting, here is the invitation link:\n' +
        `http://localhost:3000/user/verify/${hash}`

      let mailOptions = {
        from: jc_email,
        to: email,
        subject: 'Welcome to JC-Consulting',
        text: msg,
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        User.findByIdAndUpdate(id, {
          hash: hash,
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
    { hash },
    {
      activated: true,
    },

    { returnNewDocument: true }
  ).then(() => res.redirect(`http://localhost:4200/success/${hash}`))
})

//find user By ID
router.get('/findUserByHash/:hash', (req, res) => {
  let hash = req.params.hash
  User.findOneAndUpdate(
    { hash },
    {
      $unset: {
        hash: '',
      },
    }
  )
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

  User.findOne({
    $or: [{ email: inputLogin }, { username: inputLogin }],
  })
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ msg: 'Username or email cannot be found' })
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            let count = user.visited + 1
            User.findByIdAndUpdate(user._id, { visited: count })
              .then(() => {
                const payload = {
                  id: user.id,
                  email: user.email,
                  username: user.username,
                  visited: count,
                  role: user.role,
                  completed: user.completed,
                  details: user.details,
                }
                // set token
                jwt.sign(
                  payload,
                  secretOrKey,
                  { expiresIn: 10 },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: token,
                    })
                  }
                )
              })
              .catch(err => console.log(err))
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

//send Reset Password Link via email
router.post('/sendResetPassword', (req, res) => {
  let user = req.body
  let transporter = returnTransporter()
  //Create a hash to include in a link
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.log(err)
    bcrypt.hash(user._id, salt, (err, hash) => {
      if (err) console.log(err)
      hash = hash.replace(/\//g, '.')
      let msg =
        'Here is the link to reset your password\n' +
        `http://localhost:4200/reset-password/${hash}`

      let mailOptions = {
        from: jc_email,
        to: user.email,
        subject: 'JC Consulting- Reset Password',
        text: msg,
      }

      //set the link to expire in 1 hour
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err)
        let payload = {
          id: user._id,
          hash: hash,
        }

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
    })
  })
})

//Update password
router.post('/change-password', (req, res) => {
  let id = req.body.id
  let pass = req.body.pass
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pass, salt, (err, hash) => {
      User.findByIdAndUpdate(id, {
        password: hash,
      })
        .then(res.json({ msg: 'Password was succesfully updated' }))
        .catch(err => console.log(err))
    })
  })
})

//functions to create Transporter
function returnTransporter() {
  return nodemailer.createTransport({
    host: jc_host,
    port: jc_port,
    sercure: false,
    auth: {
      user: jc_email,
      pass: jc_pass,
    },
  })
}

// Send Feedback
router.post('/submit', (req, res) => {
  let feedback = new Feedback({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    preferedMode: req.body.preferedMode,
    comment: req.body.comment,
  })
  feedback
    .save()
    .then(feedback => res.json(feedback))
    .catch(err => res.json(err))
})

module.exports = router
