let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let UserSchema   = new Schema({
  username: String,
  password: String,
  lastName: String,
  firstName: String,
  admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
