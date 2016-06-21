var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Location = require("./location");


var userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  locations: [{type: mongoose.Schema.ObjectId, ref: "Location"}],
  friend_requests: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  friends: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  friends_requested: [{type: mongoose.Schema.ObjectId, ref: "User"}],
  admin: Boolean,
  image: String,
  current_dest: { lat: Number, long: Number }


});


userSchema.set('toJSON', {
  transform: function(document, json) {
    delete json.passwordHash;
    delete json.__v;
    return json;
  }
});

userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// userSchema.path('passwordHash')
//   .validate(function(passwordHash) {
//     if(!this._password) {
//       return this.invalidate('password', 'A password is required');
//     }
//     if(this._password !== this._passwordConfirmation) {
//       return this.invalidate('passwordConfirmation', 'Passwords do not match');
//     }
//   });

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);