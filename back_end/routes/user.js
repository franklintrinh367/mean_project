const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const passport = require('passport')

// Get the secret key
const secretOrKey = require('../config/keys').secretOrKey

// Load User model
const User = require('../models/User');

// User Register
router.post('/register', (req, res) => {
    console.log(req.body.email + " " + req.body.role)
    const {email, password, role} = req.body
    const newUser = new User({
        email: email,
        password: password,
        role: role
    })
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hash in your password DB.
        if(err){
            throw err
        }
        newUser.password = hash;
        newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
    })
    });  
})

//Look for existing email
router.get('/find/:email', (req, res) => {
    let email = req.params.email;
    User.findOne({email}).then(
        user => res.json(user)
    )
})
//Delete user
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;
    User.findOneAndDelete({_id: id}).then(
        user => res.json(user)
    )
    .catch(err => {
        console.log("some err : " + err)
    })
})

// User Login
router.post('/login', (req, res) => {
    const {email, password} = req.body
    console.log(email + "&" +password);

    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'User cannot be found'})
            }else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            const payload = {
                                id: user.id,
                                username: user.username,
                                email: user.email
                              }
                              // set token
                            jwt.sign(
                                payload, 
                                secretOrKey, 
                                {expiresIn: 3600}, 
                                (err, token) => {
                                  res.json({
                                    success: true,
                                    token: token
                                  })
                              });
                        }else{
                            return res.status(400).json({msg: 'Password is wrong'})
                        }
                    })
            }
        })
        .catch(err => { 
            return res.status(400).json(err)
        })
})
module.exports = router;