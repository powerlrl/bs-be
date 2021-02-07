const express = require('express')
const router = express.Router()
let bcrypt = require('bcryptjs')

let user = require('../../model/users')
const { response } = require('express')

router.get('/', async (req, res, next) => {
  res.end("用户列表数据")
})
// 登录用户
router.post('/login', async (req, res, next) => {
  let username = req.body.username
  let password = req.body.password
  // user.findOne({username: req.body.username}).then(result => {
  //   isValid = bcrypt.compareSync( password, result.password)
  //   console.log(bcrypt.compareSync( password, result.password))
  //   if (isValid) {
  //     res.send("登录成功")
  //   }else {
  //     res.send("密码不正确")
  //   }
  // })
    let isUser = await user.findOne({username: req.body.username}, (err, result) => {
      isValid = bcrypt.compareSync( password, result.password)
      if (isValid) {
        res.end("登录成功！")
      } else {
        res.end("密码不正确！")
      }
    })
  
})
// 增加用户
router.post('/create', async (req, res, next) => {
  console.log(req.body)
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
// 更新用户
router.post('/update/:id', async (req, res, next) => {
  await user.findOneAndUpdate({_id: req.params.id}, {
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
router.delete('/delete/:id', async (req, res, next) => {
  await user.remove({_id: req.params.id} ,(err, result) => {
    if (err) {
      res.send(err)
    }
    res.json({msg: "删除成功！"})
  })
})

module.exports = router