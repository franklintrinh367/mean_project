const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  adminFirstName: {
    type: String,
    require: true,
  },
  adminLastName: {
    type: String,
    require: true,
  },
})

module.exports = Admin = mongoose.model('Admin', AdminSchema)
