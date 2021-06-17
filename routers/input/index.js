const express = require('express')
const router = express.Router()
const input = require("../../model/input")

router.post("/", async (req, res) => {
  // let input2= await input.find()
  let page = (req.body.page - 1) * 10
  let input2 = await input.find().skip(page).limit(10).exec()
  res.send(input2)
})
router.get("/", async (req, res) => {
  let input2= await input.find()
  // let page = (req.body.page - 1) * 10
  // let input2 = await input.find().skip(page).limit(10).exec()
  res.send(input2)
})
router.post("/add", async (req, res) => {
  let result = await input.create({
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    price: req.body.price,
    purseTime: req.body.purseTime,
    purseNo: req.body.purseNo,
    regTime: req.body.regTime,
    regName: req.body.regName
  }).catch(err => {
    res.send({
      msg: "登记失败"
    })
  })
  if (result) {
    res.send({
      msg: "登记成功",
      result
    })
  }
})
router.delete("/:id", async (req, res) => {
  await input.remove({
    _id: req.params.id
  }, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.json({
      msg: "删除库存信息成功！"
    })
  })
})
router.put("/:id", async (req, res) => {
  await input.findOneAndUpdate({
    _id: req.params.id
  }, {
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    price: req.body.price,
    purseTime: req.body.purseTime,
    purseNo: req.body.purseNo,
    regTime: req.body.regTime,
    regName: req.body.regName
  }, (err, result) => {
    if (err) {
      res.send("更新记录失败！" + err)
    }
    res.send(result)
  })
})
module.exports = router