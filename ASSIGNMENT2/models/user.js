const mongoose = require('mongoose');
const passportLocal = require('passport-local-mongoose');

const userDataSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userDataSchema.plugin(passportLocal);

module.exports = mongoose.model('User', userDataSchema);
