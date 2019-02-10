const express = require('express');
const router = express.Router();

// get Job model
const Job = require('../../models/company/Job');

// get all Jobs
router.get('/get/all', (req, res) => {
    Job.find({}, (err, jobs) => {
        if(err){
            res.status(400).send({error: err})
        }
        if(jobs){
            res.status(200).json(jobs)
        }
    })
})

// get Job by ID
router.get('/get/:jobID', (req, res) => {
    let { jobID } = req.params;
    Job.findById({_id: jobID}, (err, job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            res.status(200).json({job: job})
        }
    })
});

// delete Job
router.delete('/delete/:jobID', (req, res) => {
     // get jobID from url   
    var { jobID } = req.params;

    Job.findOneAndDelete({_id: jobID}, (err, job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            res.status(200).json({job: job})
        }
    })
})

// update Job
router.put('/update/:jobID', (req, res) => {
    // get jobID from url
    let { jobID } = req.params;

    Job.findOne({_id: jobID}, (err, job) => {
        if (err) {
            res.status(400).json({error: "Job not found"})
        } else {
            if (req.body.jobFirstName) {
                job.JobFirstName = req.body.compJobFirstNameName
            }
            if (req.body.jobLastName) {
                job.JobLastName = req.body.JobLastName
            }
            if (req.body.password) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if(err) {
                        res.status(400).json({error: err})
                    }
                    job.password = hash
                })
            }
            job.save()
                .then(job => res.status(200).json({job: job}))
                .catch(err => res.status(400).json({error: err}))
        }
    })
})

// create a Job
router.post('/create', (req, res) => {
    // get key companyID from header
    let companyID = req.get('companyID')

    let {
        jobStatus, jobPostDate, jobEndDate, jobPosition, 
        jobDescritpion, jobActivate, compContact, compPhone
    } = req.body
    let newJob = new Job({
        companyID,
        jobStatus,
        jobPostDate,
        jobEndDate,
        jobPosition,
        jobDescritpion,
        jobActivate,
        compPhone,
        compContact,
        candidatesMatch: []
    })
    newJob.save()
        .then(job => res.status(200).json({job: job}))
        .catch(err => res.status(400).json({error: err}))
})

// apply for a job
router.post('/apply/:jobID', (req, res) => {
    // get jobID from url
    let { jobID } = req.params
    // get candidateID from header
    let candidateID = req.get('candidateID')

    Job.findById({_id: jobID})
        .then(job => {
            job.candidatesMatch.unshift({candidate: candidateID})
            job.save().then(job => res.status(200).json({job: job}))
        })
        .catch(err => res.status(400).json({error: err}))

})

module.exports = router;