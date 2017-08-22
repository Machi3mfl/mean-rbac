let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let RoleSchema   = new Schema({
  key: String,
  admin: Boolean
});

module.exports = mongoose.model('Role', RoleSchema, 'acl_roles');
