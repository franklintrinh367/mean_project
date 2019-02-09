const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// declare variable for clients 
var { Clients } = require('../../models/client/client');

router.get('/', (req, res) => {
    Clients.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retrieving Clients :' + JSON.stringify(err, undefined, 2));
    }
    })
})

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send(`No record with given id : ${req.params.id}`);
       Clients.findById(req.params.id, (err, doc) => {
           if(!err) { res.send(doc);}
           else { console.log("Error in Retrieving Clients"+ JSON.stringify(err, undefined, 2));}
       });
   });
   
// -> Code to post into the database using post

router.post('/', (req, res) => {
    var client = new Clients({
        compName: req.body.compName,
        compCRANumber: req.body.compCRANumber,
        compAddress: req.body.compAddress,
        compCity: req.body.compCity,
        compCode: req.body.compCode,
        compProvince: req.body.compProvince,
        compPhone: req.body.compPhone,
        compContact: req.body.compContact,
    });
    client.save((err, doc) => { 
      
        if (!err) { res.send(doc);}
        else { console.log('Error in Saving Client:' + JSON.stringify(err, undefined, 2)); }
    });
});



// -> Exports the router
module.exports = router;