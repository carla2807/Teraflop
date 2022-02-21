//Modelo compra
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = Schema({
  total: Number,
  cantidad: Number,
  precio: Number,

  idusuario: { type: Schema.ObjectId, ref: 'user' },
  nitproveedor: { type: Schema.ObjectId, ref: 'provider' },
  fecha: { type: Date, default: Date.now },
});

module.exports = mongoose.model('compra', CompraSchema);
