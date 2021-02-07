require('bcryptjs')
let mongoose = require('mongoose')

// 创建模型
let userSchema = new mongoose.Schema({
  type: String,
  username: String,
  sex: String,
  phone: String,
  password: {
    type: String,
    set(val) {
      return require('bcryptjs').hashSync(val)
    }
  }
})
let user = mongoose.model('User', userSchema)

module.exports = user