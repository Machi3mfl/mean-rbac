let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let UserSchema   = new Schema({
  email: String,
  password: String,
  admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
