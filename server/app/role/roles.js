'use strict';

let roles = {
  admin: {
    can: ['rule the world'],
    inherits: ['manager']
  },
  manager: {
    can: ['post:save', 'post:delete'],
    inherits: ['user']
  },
  user: {
    can: ['account:add', 'account:save', 'account:delete', 'post:add', {
      name: 'post:save',
      when: function (params, callback) {
        setImmediate(callback, null, params.ownerId === params.postId);
      }},
      {
        name: 'post:create',
        when: function (params, callback) {
          setImmediate(callback, null, params.ownerId === params.userId);
        }
      }
    ]
  }
};

module.exports.all = roles;
