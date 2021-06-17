const express = require('express')
const router = express.Router()
const account = require("../../model/account")

router.get("/", async (req, res) => {
  let accounts = await account.find()
  res.send(accounts)
})
router.post("/", async (req, res) => {
  let page = (req.body.page - 1) * 10
  let accounts = await account.find().skip(page).limit(10).exec()
  res.send(accounts)
})
router.post("/add", async (req, res) => {
  let result = await account.create({
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    price: req.body.price,
    purseName: req.body.purseName,
    accountName: req.body.accountName,
    status: req.body.status,
  }).catch(err => {
    res.send({
      msg: "增加失败"
    })
  })
  if (result) {
    res.send({
      msg: "增加成功",
      result
    })
  }
})
router.post("/:id", async (req, res) => {
  await account.findOneAndUpdate({
    _id: req.params.id
  }, {
    status: req.body.status,
    accountName: req.body.accountName
  }, (err, result) => {
    if (err) {
      res.send("更新记录失败！" + err)
    }
    res.send(result)
  })
})
// 删除
router.delete("/:id", async (req, res) => {
  await account.remove({
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
module.exports = router