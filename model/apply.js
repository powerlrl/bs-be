const mongoose = require("mongoose")
const applySchema = new mongoose.Schema({
  no: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  material: {
    type: String
  },
  num: {
    type: Number,
  },
  applyTime: {
    type: String,
  },
  applyStatus: {
    type: Number
  },
})
let apply = mongoose.model('Apply', applySchema)
module.exports = apply