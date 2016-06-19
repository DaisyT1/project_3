var mongoose = require('mongoose');
var Location = require("./location");

var userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  locations: [{type: mongoose.Schema.ObjectId, ref: "Location"}],
  friend_requests: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  friends: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  admin: Boolean,
  image: String,
  current_dest: { lat: Number, long: Number }
});

module.exports = mongoose.model('User', userSchema);