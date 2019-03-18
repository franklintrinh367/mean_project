const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdminSchema = new Schema({
  jcFirstName: {
    type: String,
    require: true,
  },
  jcLastName: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = Admin = mongoose.model('Admin', AdminSchema)
