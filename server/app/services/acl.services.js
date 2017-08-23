let roles = require('../role/roles');
let mongoose = require('mongoose');
//let Role = mongoose.model('Role'); // como importar el modelo con mongoose sin require
let Role = require('../role/role');


function getAclInstance(req){
  if (req.app.locals.acl)
    return req.app.locals.acl;
  return null;
}

async function listRoles(req, res, next){
  return await Role.find({}).select({ key: 1 });
}

// Defining routes ( resources )
// Simple overview of granted permissions
function info( req, res, next ) {
  let acl = getAclInstance(req);

  acl.allowedPermissions( get_user_id(), [ '/info', '/secret', '/topsecret' ], function( err, permissions ){
    if(err)
      console.error(err)
    res.json( permissions );
  });
}

// Setting a new role
function setRole( req, res, next ) {
  let acl = getAclInstance(req);

  acl.addUserRoles( req.params.user, req.params.role );
  response.send( req.params.user + ' is a ' + req.params.role );
}

// Unsetting a role
function unsetRole( req, res, next ) {
  let acl = getAclInstance(req);

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


// Provide logic for getting the logged-in user
//  This is a job for your authentication layer
function get_user_id( request, response ) {
  return 'admin';
}

module.exports = {
  info,
  setRole,
  unsetRole,
  listRoles
};
