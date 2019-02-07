const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Get the secret key
const secretOrKey = require('../config/keys').secretOrKey

// Load User model
const User = require('../models/User');
const Candidate = require('../models/candidate/Candidate')

// User Register
router.post('/register', (req, res) => {
    // get field input
    const {email, password, username, activated, role} = req.body
    // instantiate details field
    let details = {}
    // get params from role candidate
    if(role == 'candidate'){
        const { 
            firstName, lastName, education, occupation, 
            phoneNumber, linkedIn, address,
            city, province, postalCode, allocateStatus 
        } = req.body
        details =  new Candidate({
            firstName: firstName,
            lastName: lastName,
            education: education,
            occupation: occupation,
            phoneNumber: phoneNumber,
            linkedIn: linkedIn,
            // resume: resume,
            address: address,
            city: city,
            province: province,
            postalCode: postalCode,
            allocateStatus: allocateStatus,
        })
    }
    // get params from role candidate
    if(role == 'company'){

    }
    const newUser = new User({
        email: email,
        password: password,
        username: username,
        activated : activated,
        role : role,
        details: details,
    })
    //Hash password
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

//sendEmail
router.get('/send/:id&:email', async (req, res)=>{
    //create new hash refers to user's id
    let id = req.params.id;
    let email = req.params.email;
    bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(id, salt, (err, hash) => {
    //***important line, don't change this, sometimes bcrypt produces hash with
    //slash which will break the url
    hash = hash.replace('/', '.')

    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.com',
        port: 587,
        sercure: false,
        auth: {
            user: 'jc-consulting@mail.com',
            pass: 'computerprograming'
        }
    });

    let msg = 'Welcome to JC Consulting, here is the invitation link:\n'
    + `http://localhost:3000/user/verify/${hash}`;

    let mailOptions = {
        from: 'jc-consulting@mail.com',
        to: email,
        subject: 'Welcome to JC-Consulting',
        text: msg
    };

    transporter.sendMail(mailOptions, (err, info) =>{
        if(err) console.log(err);
        console.log(info);
        User.findByIdAndUpdate(id,    
            {
                $set: {
                    hash: hash
                }
            }).then().catch(err => console.log(err))
    })

})
})
})

//verify email
router.get('/verify/:hash', (req, res) =>{
    const hash = req.params.hash;
    User.findOneAndUpdate(hash,
        {
            $set: {
                activated: true
            }
        },

        {returnNewDocument : true}
        ).then(
            () => 
            res.redirect(`http://localhost:4200/success/${hash}`)
        )

})

//find user By ID
router.get('/findUserByHash/:hash', (req, res) => {
    let hash = req.params.hash;
    User.findOneAndUpdate(
        {hash},
        {
            $unset: {
                hash: ""
            }
        }
        ).then(
        user => {
            res.json(user)
        }
    ).catch(
        err => console.log(err)
    )
})

//Look for existing email or username
router.get('/find/:obj', (req, res) => {
    let obj = req.params.obj;
    User.findOne({
        $or : [
            {email: obj},
            {username: obj}
        ]
    }).then(
        result => {
            res.json(result)
        }
    ).catch(
        err => console.log(err)
    )
})
//Delete user
router.delete('/delete/', (req, res) => {
    User.deleteMany({}).then(
        user => res.json(user)
    )
    .catch(err => {
        console.log("some err : " + err)
    })
})

// User Login
router.post('/login', (req, res) => {
    const {email, password} = req.body

    User.findOne().or([{email: email}, {username: username}])
        .then(user => {
            if(!user){
                return res.status(400).json({msg: 'User or email cannot be found'})
            }else{
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch){
                            const payload = {
                                id: user.id,
                                email: user.email,
                                username: user.username
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
                            return res.status(400).json({msg: 'Invalid username or password'})
                        }
                    })
            }
        })
        .catch(err => { 
            return res.status(400).json(err)
        })
})
module.exports = router;