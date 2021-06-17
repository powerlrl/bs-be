const mongoose = require("mongoose")
const purseSchema = new mongoose.Schema({
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
  purseTime: {
    type: String,
  },
  purseUserName: {
    type: String
  },
})
let purse = mongoose.model('Purse', purseSchema)
module.exports = purse