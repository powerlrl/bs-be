const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const cors = require('cors')
require('./config/db.js')
app.use(cors())
app.use(express.json())

// 上传文件

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/') //文件目的地
  },
  filename: (req, file, cb) => {    //自定义文件的名称为时间戳，且后缀名为上传时候的后缀名
    cb(null, Date.now() + path.extname(file.originalname));
  }
})
const upload = multer({
  storage
})
app.use(upload.any())  //使用该条语句req.file 为undefined，查看信息的话要使用req.files为一个数组


app.use(express.static("./static"))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 导入用户列表路由
const userRouter = require('./routers/users/index.js')
app.use("/users", userRouter)

// 上传文件
app.post("/uploads", upload.single('file'), (req, res, next) => {
  console.log()
  res.end("上传成功")
})
// 防止跨域



app.listen(8888,(req, res) =>  {
  console.log('server is running 8888')
})