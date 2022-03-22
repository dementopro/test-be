const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const itemRoutes = require('./routes/item.routes');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios')
const Transaction = require('./models/transaction.js');

const bezonsRelatedCompanies = ['Amazon', 'Washington Post', 'Whole Foods', 'Blue Origin']

app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());
app.use(itemRoutes);

const mongoUri = 'mongodb://localhost:27017/test_exam'

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true
})

mongoose.connection.on('connected', () => {
  console.log("Connnected to mongo instance ....");
})

mongoose.connection.on('error', (err) => {
  console.error("Error on connecting to mongo\n", err);
})

axios
  .get('https://61b3dea5af5ff70017ca20bf.mockapi.io/transactions')
  .then(({ data }) => {
    data.map(item => {
      Object.assign(item, { is_selected: bezonsRelatedCompanies.includes(item.merchant_name) })
      const newTransaction = new Transaction(item)
      newTransaction.save()
    })
  })
  .catch(err => {
    console.log(err)
  })

app.listen(4000, () => {
  console.log("Listening on port 4000 .......");
})
