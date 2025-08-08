const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Independent Study Tracker' });
});

router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { title: 'Login', messages: messages });
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureMessage: 'Invalid credentials',
  })
);

router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Create a new account' });
});

router.post('/register', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect('/register');
      } else {
        req.login(newUser, (err) => {
          res.redirect('/tasks');
        });
      }
    }
  );
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About this app' });
});

module.exports = router;
