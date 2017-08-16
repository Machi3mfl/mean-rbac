'use strict';
let node_acl = require('acl'),
    mongoose = require('mongoose'),
    acl;

// crear toda la inicializacion de ACL module

function initAcl(dbInstance, prefix){
  if (!dbInstance){
    let dbInstance = mongoose.connection.db;
  }

  acl = new node_acl.mongodbBackend(dbInstance,prefix);
}

module.exports = {
  initAcl
}
