let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let cors = require('cors');
let logger = require('morgan')
//let http = require('http')
let authCtrl = require('./app/auth/auth');
let middleware = require('./middleware');

//configurar acl
let acl = require('./app/rbac/rbac');

// Configuramos Express
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(logger);
app.set('port', 3000);



// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
require('./app/user/user');

// logger morgan
app.use(logger('dev'))


//despues crear router
app.use('/users', require('./app/user/users.controllers'))
app.use('/rbac', require('./app/rbac/rbac.controllers'));



// Rutas de autenticación y login
app.post('/auth/signup', authCtrl.emailSignup);
app.post('/auth/login', authCtrl.emailLogin);


// Ruta solo accesible si estás autenticado
app.get('/private', middleware.ensureAuthenticated, function(req, res) {

});



// Iniciamos el servidor y la base de datos
let dbURI = 'mongodb://localhost/rbac';

/*mongoose.connect('mongodb://localhost/rbac', { useMongoClient: true },
  function(err,db) {

    // Comprobar errores siempre
    if(err)
      console.error('error', err);

    if(db)
      acl.initAcl(mongoose.connection.db, 'acl_');

    app.listen(app.get('port'), function(){
      console.log('Express corriendo en http://localhost:3000');
  });
});*/

mongoose.connect(dbURI,{ useMongoClient: true });

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
  acl.initAcl(mongoose.connection.db,'acl_');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.listen(app.get('port'), function(){
  console.log(`Express corriendo en http://localhost:${ app.get('port') }`);
});
