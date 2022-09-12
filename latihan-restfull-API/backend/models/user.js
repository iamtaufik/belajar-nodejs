const mongoose = require('mongoose');

const User = new mongoose.model('User', {
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nohp: {
    type: String,
  },
});

module.exports = User;
