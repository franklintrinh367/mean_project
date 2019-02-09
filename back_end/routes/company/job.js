const express = require('express');
const router = express.Router();

// declare variable job Object 
const Job = require('../../models/company/Job');

// get all Jobs
router.get('/get/all', (req, res) => {
    Job.find({}, (err, jobs) => {
        if(err){
            res.status(400).send({error: err})
        }
        if(companies){
            res.status(200).json(jobs)
        }
    })
})

// get Job by ID
router.get('/get/:id', (req, res) => {
    let id = req.params.id;
    Job.findById({_id: id}, (err, job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            res.status(200).json({job: job})
        }
    })
});

// delete Job
router.delete('/delete/:id', (req, res) => {
    var id = req.params.id;
    Job.findOneAndDelete({_id: id}, (err, job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            res.status(200).json({job: job})
        }
    })
})

// update Job
router.put('/update/:id', (req, res) => {
    var id = req.params.id;
    Job.findOne({_id: id}, (err, Job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            if (req.body.JobFirstName) {
                Job.JobFirstName = req.body.compJobFirstNameName
            }
            if (req.body.JobLastName) {
                Job.JobLastName = req.body.JobLastName
            }
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        res.status(400).json({error: err})
                    }
                    Job.password = hash
                })
            }
            Job.save()
                .then(Job => res.status(200).json({Job: Job}))
                .catch(err => res.status(400).json({error: err}))
        }
    })
})


// -> Exports the router
module.exports = router;