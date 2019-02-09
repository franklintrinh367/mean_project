const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JCSchema = new Schema({
  jcFirstName: {
    type: String,
    required: true
  },
  jcLastName: {
    type: String,
    required: true
  }
})

module.exports = JC = mongoose.model('jc', JCSchema)