const express = require('express')
const router = express.Router()
const purse = require("../../model/purse")

router.get("/", async (req, res) => {
  let purses = await purse.find()
  res.send(purses)
})
router.post("/", async (req, res) => {
  let page = (req.body.page - 1) * 10
  let purses = await purse.find().skip(page).limit(10).exec()
  res.send(purses)
})
router.post("/add", async (req, res) => {
  let result = await purse.create({
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    price: req.body.price,
    purseTime: req.body.purseTime,
    purseUserName: req.body.purseUserName
  }).catch(err => {
    res.send({
      msg: "新增采购物资记录失败"
    })
  })
  if (result) {
    res.send({
      msg: "新增采购物资记录成功",
      result
    })
  }
})
router.delete("/:id", async (req, res) => {
  await purse.remove({
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
router.put("/:id", async (req, res) => {
  await purse.findOneAndUpdate({
    _id: req.params.id
  }, {
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    price: req.body.price,
    purseTime: req.body.purseTime,
  }, (err, result) => {

    if (err) {
      res.send("修改采购物资记录失败！" + err)
    }
    res.send(result)
  })
})
module.exports = router