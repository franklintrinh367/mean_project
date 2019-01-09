/*-------------------------------------BACK-END-----------------------------------------------*/
var express = require('express');
var app = express();
var port = 3000 || process.env.PORT;
const cors = require('cors');
const parser = require('body-parser');
const mongoose = require('mongoose');
const router = require('../back-end/router');
const dbUrl = "mongodb://franklin.395:Trinhtrungquan395@ds233531.mlab.com:33531/jc-consulting";

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use('/api', router);

mongoose.connect(dbUrl, {useNewUrlParser: true}, (error)=> {
    if(error)
        console.log("" + error)
    else
        console.log("Successfully connected to database");
});
app.listen(3000, () => {
    console.log(`Listening to port ${port}`);
})