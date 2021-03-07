const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken")

let bcrypt = require('bcryptjs')

let user = require('../../model/users')

const SECRET = "ji34ro4iro3ijr" //校验token
router.get('/', async (req, res) => {

  // let users = await user.find().skip(10).limit(10).exec()
  let users = await user.find()
  res.send(users)
})
// 登录用户
router.post('/login', async (req, res) => {
  let username = req.body.username
  let password = req.body.password
  let isUser = await user.findOne({
    username: req.body.username
  })
  if (!isUser) {
    return res.status(422).send({
      message: "用户名不存在"
    })
  }
  const isPwd = bcrypt.compareSync(password, isUser.password)
  if (!isPwd) {
    return res.status(422).send({
      message: "密码不正确"
    })
  }

  // 生成token

  const token = jwt.sign({
    id: String(isUser._id)
  }, SECRET)
  res.send({
    isUser,
    token
  })
})
// 增加用户
router.post('/create', async (req, res) => {
  await user.create({
    username: req.body.username,
    sex: req.body.sex,
    phone: req.body.phone,
    type: req.body.type,
    password: req.body.password,
  }, (err, result) => {
    if (err) {
      res.send("插入数据失败！")
      return
    }
    res.send(result)
  })
})
// 自定义需要token登录中间件
const auth = async (req, res, next) => {
  const raw = String(req.headers.authorization).split(" ").pop()
  const {id} = jwt.verify(raw, SECRET)
  req.userInfo = await user.findById(id)
  next()
}
router.get("/profile", auth, async(req, res) => {
  res.send(req.userInfo)
})
// 更新用户
router.post('/update/:id', async (req, res) => {
  await user.findOneAndUpdate({
    _id: req.params.id
  }, {
    username: req.body.username,
    sex: req.body.sex,
  }, (err, result) => {
    if (err) {
      res.send("更新记录失败！" + err)
    }
    res.send(result)
  })
})
// 删除用户
router.delete('/delete/:id', async (req, res) => {
  await user.remove({
    _id: req.params.id
  }, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.json({
      msg: "删除成功！"
    })
  })
})

// 更加id查询一个用户
router.get('/:id', async (req, res, next) => {
  await user.findOne({
    _id: req.params.id
  }, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})


module.exports = router