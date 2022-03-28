const Transaction = require('../models/transaction.js')
const axios = require('axios')
const mongoose = require('mongoose');

async function getList(req, res) {
  axios
    .get('https://61b3dea5af5ff70017ca20bf.mockapi.io/transactions')
    .then(async ({ data }) => {

      const collections = await mongoose.connection.db.collections()
      collections.map(item => {
        item.namespace === 'test_exam.transactions' && item.deleteMany({})
      })

      data.map(async (item, index) => {
        Object.assign(item, { is_selected: req.body.bezosRelatedCompanies.includes(item.merchant_name) })
        const newTransaction = new Transaction(item)
        await newTransaction.save()
      })
    })
    .catch(err => {
      console.log(err)
    })

  const tableData = await Transaction.find({})
  tableData.sort((a, b) => a.id - b.id)
  res.json(tableData)
}

async function updateDatabase(req, res) {
  const collections = await mongoose.connection.db.collections()
  collections.map(item => item.namespace === 'test_exam.transactions' && item.deleteMany({}))

  Promise.all(
    req.body.map(async item => {
      const newTransaction = new Transaction(item)
      await newTransaction.save()
    })
  ).then(async () => {
    const data = await Transaction.find({})
    data.sort((a, b) => a.id - b.id)
    res.json(data)
  })

}

module.exports = {
  getList,
  updateDatabase
}
