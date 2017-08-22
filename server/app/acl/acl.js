let node_acl = require('acl'),
  roles = require('../role/roles'),
  express = require('express'),
  acl;

function initAcl(db,mongo_prefix ) {

  let mongoBackend = new node_acl.mongodbBackend( db, mongo_prefix );

  // Create a new access control list by providing the mongo backend
  //  Also inject a simple logger to provide meaningful output
  acl = new node_acl(mongoBackend);
  // Defining roles and routes
  setRoles();

  return acl;
}

// This creates a set of roles which have permissions on
//  different resources.
function setRoles() {
  // Define roles, resources and permissions
  acl.allow(roles);

  // Inherit roles
  acl.addRoleParents( 'user', 'guest' ); //  Every user is allowed to do what guests do
  acl.addRoleParents( 'admin', 'user' ); //  Every admin is allowed to do what users do
  acl.addUserRoles('admin','admin')
}

module.exports = {
  initAcl
};
