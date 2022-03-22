const express = require('express')

const router = express.Router()
const transactionCtrl = require('../controllers/transaction.controller')

router.route('/transactions')
	.get(transactionCtrl.getList)
	.post(transactionCtrl.updateDatabase)

module.exports = router
