let mongoose = require('mongoose'),
    service = require('./../../service'),
    User = require('./../user/user')
//User = mongoose.model('User'), aprender como usarlo asi

exports.emailSignup = function(req,res){
  let user = new User({
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  })
  user.save(function(err){
    return res
      .status(200)
      .send({ token: service.createToken(user) })
  })
}

exports.emailLogin = function(req,res){
  User.findOne({ email: req.body.email.toLowerCase() }, function(err,user){
    return res
      .status(200)
      .send({ token: service.createToken(user) })
  })
}
