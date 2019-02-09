const express = require('express');
const router = express.Router();

// declare variable for clients 
const Admin = require('../../models/admin/admin');

// get all admins
router.get('/get/all', (req, res) => {
    Admin.find({role: 'admin'}, (err, admins) => {
        if(err){
            res.status(400).send({error: err})
        }
        if(companies){
            res.status(200).json(admins)
        }
    })
})

// get admin by ID
router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Admin.findById({_id: id}, (err, admin) => {
        if (err) {
            res.status(400).json({error: "Admin not found"})
        } else {
            res.status(200).json({admin: admin})
        }
    })
});

// delete admin
router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    Admin.findOneAndDelete({_id: id}, (err, admin) => {
        if (err) {
            res.status(400).json({error: "Admin not found"})
        } else {
            res.status(200).json({admin: admin})
        }
    })
})

// update admin
router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    Admin.findOne({_id: id}, (err, admin) => {
        if (err) {
            res.status(400).json({error: "Admin not found"})
        } else {
            if (req.body.adminFirstName) {
                admin.adminFirstName = req.body.compadminFirstNameName
            }
            if (req.body.adminLastName) {
                admin.adminLastName = req.body.adminLastName
            }
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        res.status(400).json({error: err})
                    }
                    admin.password = hash
                })
            }
            admin.save()
                .then(Admin => res.status(200).json({Admin: Admin}))
                .catch(err => res.status(400).json({error: err}))
        }
    })
})


// -> Exports the router
module.exports = router;