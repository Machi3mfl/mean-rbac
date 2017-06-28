"use strict"
// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

let session = require('express-session')
let eSession = require('easy-session')
let cookieParser = require('cookie-parser')


// Get our API routes
const api = require('./routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

/**
 * Implement sessions ******/
app.use(cookieParser())
app.use(session(
  {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }
))

// Add a path to allow easy login to any role
app.get('/login/:role', function (req, res, next) {
  // Going to hardcode the user object
  let extend = {
    user: {
      id: 2
    }
  };
  req.session.login(req.params.role, extend, function () {
    res.redirect('/');
  });
});

// A path to destroy our session
app.get('/logout', function (req, res, next) {
  req.session.logout(function () {
    res.redirect('/');
  });
});

app.get('/', function (req, res, next){
  res.send('Current role is ' + JSON.stringify(req.session.getRole()));
});

// We need no authentication here
app.get('/blog', function (req, res, next) {
  res.send('Cool blog post');
});

app.get('/blog/create', function (req, res, next) {
  // Check if user has access
  req.session.can('blog:create')
    .then(function () {
      res.send('Blog edit');
    })
    .catch(function () {
      res.sendStatus(403);
    });
});

let $q = require('q');
function findBlog(id) {
  return $q({
    ownerId: parseInt(id)
  });
}

app.get('/blog/edit/:id', function (req, res, next) {
  // look for blog
  findBlog(req.params.id)
    .then(function (blog) {
      //check for access
      return req.session.can('blog:edit', {user: req.session.user, blog: blog});
    }, function (err) {
      // Handling db errors
      res.sendStatus(500);
    })
    .then(function () {
      // we have access so edit
      res.send('Editing blog');
    }, function (err) {
      // Handling auth errors
      res.sendStatus(403);
    });
});

app.use(eSession.main(session, {
  rbac: {
    guest: {
      can: ['blog:read']
    },
    writer: {
      can: ['blog:create', {
        name: 'blog:edit',
        when: function (params, cb) {
          //check if user is the owner
          setImmediate(cb, null, params.user.id === params.blog.ownerId);
        }
      }],
      inherits: ['guest']
    }
  }
}));

/****
 ****** ROUTES : Catch all other routes and return the index file ***/
/*app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});*/



/**
 * Get port from environment and store in Express. ****/
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Create HTTP server. ****/
const server = http.createServer(app);



/**
 * Listen on provided port, on all network interfaces. ****/
server.listen(port, function(err) {
  if(err){
    return console.log('something bad wrong',err)
  }
  console.log('API running on localhost:' + port);
  });
