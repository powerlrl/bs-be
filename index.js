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


// app.use(express.static("./uploads'"))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 导入用户列表路由
const userRouter = require('./routers/users/index.js')
app.use("/users", userRouter)

// 导入物资分类列表路由
const categoryRouter = require('./routers/category')
app.use("/category", categoryRouter)

// 导入采购物资列表路由
const purseRouter = require('./routers/purse')
app.use("/purse", purseRouter)

// 导入申领表
const applyRouter = require('./routers/apply')
app.use("/apply", applyRouter)

// 导入入库表
const inputRouter = require('./routers/input')
app.use("/input", inputRouter)

// 导入报销表
const accountRouter = require('./routers/account')
app.use("/account", accountRouter)

// 上传文件
app.post("/uploads", upload.single('file'), async(req, res, next) => {
  const url = `http://localhost:8888/uploads/${req.files[0].filename}`
  // console.log(url)
  next()
  res.end(url)
})
// 防止跨域



app.listen(8888,(req, res) =>  {
  console.log('server is running 8888')
})