const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
// declare the path
//const path = require('path')
// DB config
const db = require('./back_end/config/keys').mongoURI

// Connect to Database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Import Routes
const user = require('./back_end/routes/user')
const candidate = require('./back_end/routes/candidate')
const company = require('./back_end/routes/company')
const job = require('./back_end/routes/job')
const admin = require('./back_end/routes/admin')

app.get('/', (req, res) => {
  res.send('Server')
})

// Route config
app.use('/user', user)
app.use('/candidate', candidate)
app.use('/company', company)
app.use('/jobs', job)
app.use('/admin', admin)
// Port Number
const port = 3000 || process.env.PORT

// Start Server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
