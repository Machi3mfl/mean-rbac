'use strict';

let roles = [
  {
    roles: 'admin',
    allows: [
      { resources: '/secret', permissions: 'create' },
      { resources: '/topsecret', permissions: '*' }
    ]
  }, {
    roles: 'user',
    allows: [
      { resources: '/secret', permissions: 'get' }
    ]
  }, {
    roles: 'guest',
    allows: []
  }
]

module.exports = roles;
