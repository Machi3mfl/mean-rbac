let jwt = require('jwt-simple'),
  moment = require('moment'),
  config = require('./config')

exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  let token = req.headers.authorization.split(" ")[1];
  let payload = jwt.decode(token, config.TOKEN_SECRET);

  if(payload.exp <= moment().unix()) {
    return res
      .status(401)
      .send({message: "El token ha expirado"});
  }

  req.user = payload.sub;
  next();
}
