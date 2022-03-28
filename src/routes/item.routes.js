const express = require('express')

const router = express.Router()
const transactionCtrl = require('../controllers/transaction.controller')
const bezosCtrol = require('../controllers/bezos.controller')

router.route('/transactions')
  .post(transactionCtrl.getList)
router.route('/transactions/update')
  .post(transactionCtrl.updateDatabase)
router.route('/bezos')
  .get(bezosCtrol.getList)
  .post(bezosCtrol.updateDatabase)

module.exports = router
