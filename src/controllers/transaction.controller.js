const Transaction = require('../models/transaction.js')

async function getList(req, res) {
  const data = await Transaction.find()

  res.json(data)
}

async function updateDatabase(req, res) {
  req.body.map(async item => {
    const transaction = await Transaction.findById(item._id)
    Object.assign(transaction, item)
    await transaction.save()
  })
  const data = await Transaction.find()

  res.json(data)
}

module.exports = {
  getList,
  updateDatabase
}
