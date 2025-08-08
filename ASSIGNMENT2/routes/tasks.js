const express = require('express');
const router = express.Router();
const Task = require('../models/task');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.get('/', isAuthenticated, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.render('tasks', { tasks });
});

router.get('/add', isAuthenticated, (req, res) => {
  res.render('addTask');
});

router.post('/add', isAuthenticated, async (req, res) => {
  const { title, description, status } = req.body;
  await Task.create({ title, description, status, user: req.user._id });
  res.redirect('/tasks');
});

router.get('/edit/:id', isAuthenticated, async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.redirect('/tasks');
  res.render('editTask', { task });
});
router.post('/edit/:id', isAuthenticated, async (req, res) => {
  const { title, description, status } = req.body;
  await Task.updateOne(
    { _id: req.params.id, user: req.user._id },
    { title, description, status }
  );
  res.redirect('/tasks');
});

router.post('/delete/:id', isAuthenticated, async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, user: req.user._id });
  res.redirect('/tasks');
});

module.exports = router;
