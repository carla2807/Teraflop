//Modelo detalle compra
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleCompraSchema = Schema({
  total: Number,
  cantidad: Number,
  precio: Number,
  idproducto: { type: Schema.ObjectId, ref: 'product' },
  compra: { type: Schema.ObjectId, ref: 'compra' },
});

module.exports = mongoose.model('detallecompra', DetalleCompraSchema);
