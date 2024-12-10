const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  barberShopId: { type: mongoose.Schema.Types.ObjectId, ref: 'BarberShop', required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending'], default: 'pending' },
});

module.exports = mongoose.model('Payment', PaymentSchema);
