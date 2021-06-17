const express = require('express')
const router = express.Router()
const apply = require("../../model/apply")

router.get("/", async (req, res) => {
  let applies = await apply.find()
  res.send(applies)
})
router.post("/", async (req, res) => {
  let page = (req.body.page - 1) * 10
  let applies = await apply.find().skip(page).limit(10).exec()
  res.send(applies)
})
router.post("/add", async (req, res) => {
  let result = await apply.create({
    no: req.body.no,
    name: req.body.name,
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    applyTime: req.body.applyTime,
    applyStatus: req.body.applyStatus
  }).catch(err => {
    res.send({
      msg: "新增申领人失败"
    })
  })
  if (result) {
    res.send({
      msg: "新增申领人成功",
      result
    })
  }
})
router.delete("/:id", async (req, res) => {
  await apply.remove({
    _id: req.params.id
  }, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.json({
      msg: "删除申领人"
    })
  })
})
router.put("/:id", async (req, res) => {
  await apply.findOneAndUpdate({
    _id: req.params.id
  }, {
    no: req.body.no,
    name: req.body.name,
    category: req.body.category,
    material: req.body.material,
    num: req.body.num,
    applyTime: req.body.applyTime,
    applyStatus: req.body.applyStatus
  }, (err, result) => {

    if (err) {
      res.send("更新申领人" + err)
    }
    res.send(result)
  })
})
module.exports = router