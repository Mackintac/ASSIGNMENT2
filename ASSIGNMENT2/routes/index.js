var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Independent Study Tracker' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/register', function (req, res, next) {
  User.register();
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About this app' });
});

module.exports = router;
