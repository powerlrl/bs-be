const express = require('express')
const router = express.Router()
const category = require("../../model/category")

router.post("/", async (req, res) => {
  let page = (req.body.page - 1) * 10
  let categories = await category.find().skip(page).limit(10).exec()
  res.send(categories)
})
router.get("/", async (req, res) => {
  let categories = await category.find()
  res.send(categories)
})
router.post("/add", async (req, res) => {
  let result = await category.create({
    code: req.body.code,
    name: req.body.name,
    description: req.body.description
  }).catch(err => {
    res.send({
      msg: "新增物资分类失败"
    })
  })
  if (result) {
    res.send({
      msg: "新增物资分类成功",
      result
    })
  }
})
router.delete("/:id", async (req, res) => {
  await category.remove({
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
  await category.findOneAndUpdate({
    _id: req.params.id
  }, {
    code: req.body.code,
    name: req.body.name,
    description: req.body.description
  }, (err, result) => {

    if (err) {
      res.send("修改物资分类成功" + err)
    }
    res.send(result)
  })
})
module.exports = router