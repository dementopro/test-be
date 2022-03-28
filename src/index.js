const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const itemRoutes = require('./routes/item.routes');
const app = express();
const mongoose = require('mongoose');
const Bezos = require('./models/bezos.js');

const bezosCompanies = ['Amazon', 'Washington Post', 'Whole Foods', 'Blue Origin']

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

bezosCompanies.map(async item => {
  const newBezos = new Bezos({ name: item })
  await newBezos.save()
})

app.listen(4000, () => {
  console.log("Listening on port 4000 .......");
})
