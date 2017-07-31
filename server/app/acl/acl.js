let node_acl = require('acl'),
    roles = require('../role/roles'),
    express = require('express'),
    router = express.Router()
    mongo_prefix = 'acl_'

exports.mongoConnect = function ( error, db ) {

  let mongoBackend = new node_acl.mongodbBackend( db, mongo_prefix );

// Create a new access control list by providing the mongo backend
//  Also inject a simple logger to provide meaningful output
  acl = new node_acl(mongoBackend);

  // Defining roles and routes
  setRoles();
  //set_routes();
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

// Defining routes ( resources )

// Simple overview of granted permissions
  exports.info = function( req, res, next ) {
      acl.allowedPermissions( get_user_id(), [ '/info', '/secret', '/topsecret' ], function( err, permissions ){
        if(err)
          console.error(err)
        res.json( permissions );
      });
  }



  // Setting a new role
  exports.setRole = function( req, res, next ) {
    acl.addUserRoles( req.params.user, req.params.role );
    response.send( req.params.user + ' is a ' + req.params.role );
  }

  // Unsetting a role
  exports.unsetRole = function( req, res, next ) {
    acl.removeUserRoles( req.params.user, req.params.role );
    response.send( req.params.user + ' is not a ' + req.params.role + ' anymore.' );
  };




// Only for users and higher
  /*router.get( '/secret', acl.middleware( 1, get_user_id ),
    function( request, response, next ) {
      response.send( 'Welcome Sir!' );
    }
  );*/

 // Only for admins
 /*router.get( '/topsecret', acl.middleware( 1, get_user_id ),
   function( request, response, next ) {
    response.send( 'Hi Admin!' );
   }
 );*/

 //module.exports = router

// Provide logic for getting the logged-in user
//  This is a job for your authentication layer
function get_user_id( request, response ) {
  return 'admin';
}


