const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JCSchema = new Schema({
  userID: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})

module.exports = JC = mongoose.model('jc', JCSchema)