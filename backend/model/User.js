const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  username: { type: String, required: true, unique: true, maxlength: 50 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  phone_no: { type: String, maxlength: 15 },
  address: { type: String },
  password: { type: String, required: true, maxlength: 255 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
