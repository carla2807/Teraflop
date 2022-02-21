//Modelo venta
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = Schema({
  total: Number,
  fecha: { type: Date, default: Date.now },
  client: { type: Schema.ObjectId, ref: 'client' },
});

module.exports = mongoose.model('venta', VentaSchema);
