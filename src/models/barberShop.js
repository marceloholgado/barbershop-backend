const mongoose = require('mongoose');

// Esquema do Cliente
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
});

// Esquema do Agendamento
const AppointmentSchema = new mongoose.Schema({
  client: { type: ClientSchema, required: true }, // Referência ao cliente
  dateTime: { type: Date, required: true },
  serviceType: { type: String, required: true }, // Tipo de serviço
});

// Esquema do Barbeiro
const BarberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: { type: [AppointmentSchema], default: [] }, // Lista de agendamentos
});

// Esquema da Barbearia
const BarberShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  url: { type: String, unique: true, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  barbers: { type: [BarberSchema], default: [] }, // Lista de barbeiros
});

module.exports = mongoose.model('BarberShop', BarberShopSchema);
