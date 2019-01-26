const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/User');

// User Register
router.post('/register', (req, res) => {
    const {firstName, lastName, email, password} = req.body

    User.findOne({email})
        .then(user => {
        if(user){
            return res.status(400).json({email: 'Email is existed'})
        }else{
            const newUser = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            })
            bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                // Store hash in your password DB.
                if(err){
                    throw err
                }
                newUser.password = hash
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
            })
            });
        }
        })
        .catch(err => console.log(err))
})

// User Login
router.post('/login', (req, res) => {
    const {email, password} = req.body
    User.findOne({email})
    .then(user => {
      if(!user){
        return res.status(400).json({email: 'User cannot be found'})
      }else{
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if(isMatch){
              return res.json(user)
            }else{
              return res.status(400).json({password: 'Password is wrong'})
            }
          });
      }
    })
})

module.exports = router;