// ServiceProvider model
const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, maxlength: 100 },
  phone_no: { type: String, maxlength: 15 },
  address: { type: String },
  location:{type :String},
  pin:{type:Number},
  password: { type: String, required: true, maxlength: 255 },
  service_type: { type: String, required: true, maxlength: 100 }
});

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema);
