const mongoose = require("mongoose")
const inputSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  material: {
    type: String
  },
  num: {
    type: Number,
  },
  price: {
    type: Number,
  },
  purseTime: {
    type: String,
  },
  purseNo: {
    type: String,
  },
  regTime: {
    type: String,
  },
  regName: {
    type: String,
  },
})
let t_input = mongoose.model('t_input', inputSchema)
module.exports = t_input