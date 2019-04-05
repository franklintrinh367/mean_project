const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  activated: {
    type: Boolean,
    required: true,
  },

  visited: {
    type: Number,
  },
  details: {
    type: Object,
    required: true,
  },
  hash: {
    type: String,
  },
})

module.exports = User = mongoose.model('User', UserSchema)
