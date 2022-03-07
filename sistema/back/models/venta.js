//Modelo venta
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
  fecha: { type: Date, default: Date.now },
  client: { type: Schema.ObjectId, ref: 'client' },
  user: { type: Schema.ObjectId, ref: 'user' },
  estado: String,
});

module.exports = mongoose.model('venta', VentaSchema);
