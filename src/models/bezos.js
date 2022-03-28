const mongoose = require('mongoose');

const BezosSchema = mongoose.Schema({
  name: {
    type: String,
  }
});

module.exports = mongoose.model('Bezos', BezosSchema);