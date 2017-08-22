let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require( 'mongoose' ),
    cors = require('cors'),
    logger = require('morgan'),
    authCtrl = require('./app/auth/auth'),
    middleware = require('./middleware'),
    AclCtrl = require('./app/acl/acl.controllers');


//configurar acl
let acl = require('./app/acl/acl');

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

  //app.use(logger);
  app.set('port', 3000);

  // Rutas de autenticación y login
  app.post('/auth/signup', authCtrl.signin);
  app.post('/auth/login', authCtrl.login);

  // Importamos nuestros modelos,
  // en este ejemplo nuestro modelo de usuario
  app.use('/users', require('./app/user/users.controllers'))
  //app.use('/acl', require('./app/user/acl.controllers'))

// logger morgan
  app.use(logger('dev'))

//acl routes
  app.use('/acl', AclCtrl);

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
    let instance = acl.initAcl(mongoose.connection.db,'acl_');
    if (instance)
      app.locals.acl = instance;
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


