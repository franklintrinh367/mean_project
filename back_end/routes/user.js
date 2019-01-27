const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');

// User Register
router.post('/register', (req, res) => {
    const {username, email, password} = req.body

    User.findOne().or([{ email: email }, { username: username} ])
        .then(user => {
            if(user){
                return res.status(400).json({user: 'Username or email is existed'})
            }else{
                const newUser = new User({
                    username: username,
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
})

// User Login
router.post('/login', (req, res) => {
    const {input, password} = req.body

    User.findOne().or([{ email: input }, { username: input} ])
        .then(user => {
            if(!user){
                return res.status(400).json({user: 'User cannot be found'})
            }else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            return res.json(user)
                        }else{
                            return res.status(400).json({password: 'Password is wrong'})
                        }
                    })
            }
        })
        .catch(err => { 
            return res.status(400).json(err)
        })
})
module.exports = router;