require('bcryptjs')
let mongoose = require('mongoose')

// 创建模型
let userSchema = new mongoose.Schema({
  type: String,
  username: {
    type: String,
    unique: true
  },
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
// 清空用户的这个集合
// user.db.dropCollection('users')

module.exports = user