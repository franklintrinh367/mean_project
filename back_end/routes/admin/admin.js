const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// declare variable for clients 
var { Admins } = require('../../models/admin/admin');

router.get('/', (req, res) => {
    Admins.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retrieving Clients :' + JSON.stringify(err, undefined, 2));
    }
    })
})

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send(`No record with given id : ${req.params.id}`);
       Admins.findById(req.params.id, (err, doc) => {
           if(!err) { res.send(doc);}
           else { console.log("Error in Retrieving Clients"+ JSON.stringify(err, undefined, 2));}
       });
   });
   
// -> Code to post into the database using post

router.post('/', (req, res) => {
    var adminController = new Admins({
        adminFirstName: req.body.adminFirstName,
        adminLastName: req.body.adminLastName
    });
    adminController.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log('Error in Saving Admin:' + JSON.stringify(err, undefined, 2)); }
    });
});

// -> Exports the router
module.exports = router;