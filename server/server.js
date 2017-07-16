let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let cors = require('cors');
let logger = require('morgan')
//let http = require('http')
let authCtrl = require('./app/auth/auth');
let middleware = require('./middleware');

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

// Iniciamos las rutas de nuestro servidor/API
let router = express.Router();
//despues crear router
app.use('/users', require('./app/user/users.controllers'))



// Rutas de autenticación y login
app.post('/auth/signup', authCtrl.emailSignup);
app.post('/auth/login', authCtrl.emailLogin);


// Ruta solo accesible si estás autenticado
app.get('/private', middleware.ensureAuthenticated, function(req, res) {

});

// Iniciamos el servidor y la base de datos
mongoose.connect('mongodb://localhost/rbac', { useMongoClient: true },
  function(err) {
    // Comprobar errores siempre
    app.listen(app.get('port'), function(){
      console.log('Express corriendo en http://localhost:3000');
  });
});
