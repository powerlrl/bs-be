let mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

// 数据库设置
let db = mongoose.connect('mongodb://localhost:27017/bsdb',{ 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
 })
.then(
  () => { console.log("连接成功") },
  err => {console.log("连接失败")}
)

  module.exports = db