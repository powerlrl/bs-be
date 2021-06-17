const mongoose = require("mongoose")
const accountSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  material: {
    type: String,
  },
  num: {
    type: Number,
  },
  price: {
    type: String,
  },
  purseName: {
    type: String,
  },
  accountName: {
    type: String
  },
  status: {
    type: String,
  }
})
let account = mongoose.model('Account', accountSchema)

// account.db.dropCollection('accounts')
module.exports = account