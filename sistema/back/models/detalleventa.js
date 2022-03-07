//Modelo detalle venta
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DetalleVentaSchema = Schema({
  cantidad: Number,
  idproducto: { type: Schema.ObjectId, ref: 'product' },
  venta: { type: Schema.ObjectId, ref: 'venta' },
});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);
