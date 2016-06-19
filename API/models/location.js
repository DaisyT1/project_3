var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: String,
  address: String,
  lat: Number,
  long: Number,
  private: Boolean
});

module.exports = mongoose.model('Location', locationSchema);