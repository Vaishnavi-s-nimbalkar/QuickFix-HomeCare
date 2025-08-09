// Order model
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'ServiceProvider', required: true },
  service: { type: String, required: true },
  address: { type: String },
  order_time: { type: Date, default: Date.now },
  status: { type: String, maxlength: 50 },
  rating: { type: Number },
  feedback: { type: String }
});

module.exports = mongoose.model('Order', OrderSchema);
