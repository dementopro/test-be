const Bezos = require('../models/bezos.js')
const axios = require('axios')
const mongoose = require('mongoose');


async function getList(req, res) {
  const tableData = await Bezos.find({})
  res.json(tableData)
}

async function updateDatabase(req, res) {
  const collections = await mongoose.connection.db.collections()
  collections.map(item => item.namespace === 'test_exam.bezos' && item.deleteMany({}))

  Promise.all(
    req.body.bezosCompanies.map(async item => {
      const newTransaction = new Bezos({ name: item })
      await newTransaction.save()
    })
  ).then(async () => {
    const data = await Bezos.find({})
    res.json(data)
  })

}

module.exports = {
  getList,
  updateDatabase
}
