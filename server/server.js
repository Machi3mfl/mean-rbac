let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let cors = require('cors');
let authCtrl = require('./app/auth/auth');
let middleware = require('./middleware');

// Configuramos Express
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', 3000);

// Importamos nuestros modelos,
// en este ejemplo nuestro modelo de usuario
require('./app/user/user');

// Iniciamos las rutas de nuestro servidor/API
let router = express.Router();

// Rutas de autenticación y login
router.post('/auth/signup', authCtrl.emailSignup);
router.post('/auth/login', authCtrl.emailLogin);

// Ruta solo accesible si estás autenticado
router.get('/private', middleware.ensureAuthenticated, function(req, res) {

});

// Iniciamos el servidor y la base de datos
mongoose.connect('mongodb://localhost', function(err) {
  // Comprobar errores siempre
  app.listen(app.get('port'), function(){
    console.log('Express corriendo en http://localhost:3000');
  });
});
