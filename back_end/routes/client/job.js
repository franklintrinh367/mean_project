const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// declare variable job Object 
var { Jobs } = require('../../models/client/jobs');

router.get('/', (req, res) => {
    Jobs.find((err, docs) => {
        if (!err) { res.send(docs);}
        else { console.log('Error in Retrieving Clients :' + JSON.stringify(err, undefined, 2));
    }
    })
})

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
       return res.status(400).send(`No record with given id : ${req.params.id}`);
       Jobs.findById(req.params.id, (err, doc) => {
           if(!err) { res.send(doc);}
           else { console.log("Error in Retrieving Jobs"+ JSON.stringify(err, undefined, 2));}
       });
   });
   
// -> Code to post into the database using post

router.post('/', (req, res) => {
    var job = new Jobs({
       /**/ 
    });
    job.save((err, doc) => {
        if (!err) { res.send(doc);}
        else { console.log('Error in Saving Jobs:' + JSON.stringify(err, undefined, 2)); }
    });
});

// -> Exports the router
module.exports = router;