let mongoose = require('mongoose')
let categorySchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true,
  },
  description: {
    type: String
  }
})
let category = mongoose.model('Category', categorySchema)
module.exports = category