let mongoose = require('mongoose'),
    service = require('./../../service'),
    User = require('./../user/user'),
    bcrypt = require('bcryptjs'),
    _ = require('lodash')
//User = mongoose.model('User'), aprender como usarlo asi

exports.signin = function(req,res){
  let user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    admin: req.body.admin
  })
  // validation
  User.findOne({ username: user.username },
    function (err, user) {
      if (err)
        return res.status(400).send(err.name + ': ' + err.message);

      if (user) {
        // username already exists
        return res.status(400).send('Username "' + user.username + '" is already taken');
      } else {
        createUser();
      }
    });

  function createUser() {
    user.save(function (err) {
        if (err)
          return res.status(400).send(err.name + ': ' + err.message);
        return res
                .status(200)
                .send({ token: service.createToken(user) })
      });
  }
}

exports.login = function(req,res){
  User.findOne({ username: req.body.username.toLocaleLowerCase() }, function (err, user) {
    if (err){
      console.log('err', err);
      return res.status(400).send(err.name + ': ' + err.message);
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      // authentication successful

      let userData = {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        token: service.createToken(user)
      }
      console.log('res', userData);
      return res
        .status(200)
        .send(userData)
    } else {
      // authentication failed
      return res.status(400).send('Username or password is incorrect');
    }
  });
}
