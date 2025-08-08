const mongoose = require('mongoose');
const passportLocal = require('passport-local-mongoose');

const userDataSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const userSchema = new mongoose.Schema(userDataSchema);

userSchema.plugin(passportLocal);

module.exports = mongoose.model('User', userSchema);
