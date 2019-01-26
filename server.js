const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');


// DB config
const db = require('./config/database').mongoURI

// Connect to Database
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())  

// Import Routes
const user = require('./routes/user');
const candidate = require('./routes/candidate/candidate');

app.get('/', (req, res) => {
  res.send('Server');
});

// Route config
app.use('/user', user);
app.use('/candidate', candidate);

// Port Number
const port = 3000 || process.env.PORT;

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})