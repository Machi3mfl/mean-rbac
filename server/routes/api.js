"use strict"

const express = require('express');
let mongoose = require('mongoose');
const router = express.Router();

let session = require('express-session')
let eSession = require('easy-session')
let cookieParser = require('cookie-parser')

/* declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
*/


/* GET api listing. */
router.get('/', function(req, res) {
    res.send('api works!')
});

/* create middleware
router.get('/blog/create', eSession.can('blog:create'), function (req, res, next) {
  res.send('Blog edit');
});

function getParams(req, res, cb) {
  findBlog(req.params.id)
    .then(function (blog) {
      cb(null, {
        user: req.session.user,
        blog: blog
      });
    }, cb);
}

router.get('/blog/edit/:id', eSession.can('blog:edit', getParams), function (req, res, next) {
  res.send('Editing blog');
});*/

// Get all posts
/*
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
  axios.get(`${API}/posts`)
  .then(posts => {
  res.status(200).json(posts.data);
})
.catch(error => {
  res.status(500).send(error)
});
});
*/

module.exports = router;
