let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require( 'mongoose' ),
    cors = require('cors'),
    logger = require('morgan'),
    authCtrl = require('./app/auth/auth'),
    middleware = require('./middleware'),
    AclCtrl = require('./app/acl/acl');
    mongoose.Promise = global.Promise;

  // Importamos nuestros modelos (Usuario)
  require('./app/user/user');

  // Configuramos Express
  let app = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logger('dev'))  // logger morgan
  app.set('port', 3000);
  app.use( function( error, request, response, next ) {
    if( !error ) return next();
    response.send( error.msg, error.errorCode );
  });

  // Iniciamos las rutas de nuestro servidor/API
  //let router = express.Router();
  //despues crear router
  app.use('/users', require('./app/user/users.controllers'))

  // Rutas de autenticación y login
  app.post('/auth/signup', authCtrl.signin);
  app.post('/auth/login', authCtrl.login);

  // Ruta solo accesible si estás autenticado
  app.get('/admin', middleware.ensureAuthenticated, function(req, res) {
  });

  //acl routes
  app.use('/info',AclCtrl.info)
  app.use('/allow/:user/:role', AclCtrl.setRole)
  app.use('/disallow/:user/:role', AclCtrl.unsetRole)

  let dbURI = 'mongodb://localhost/rbac';

// Connecting to our mongo database
  mongoose.connect( dbURI, { useMongoClient: true },
    function(err,db) {
    if(err)
        console.error('Mongoose default connection error: ' + err);

    app.listen(app.get('port'), function(){
      console.log('Express corriendo en http://localhost:3000');
    });
  });


  mongoose.connection.on('connected',function(){
    AclCtrl.mongoConnect(null,mongoose.connection.db)
    console.log('Mongoose default connection open to ' + dbURI);
  });

  // If the connection throws an error
  mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', function() {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });


