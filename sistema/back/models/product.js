//Modelo producto
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  nombre: String,
  imagen: String,
  descripcion: String,
  marca: String,
  modelo: String,
  precio: Number,
  stock: Number,

  nitproveedor: { type: Schema.ObjectId, ref: 'provider' },
  nitcategoria: { type: Schema.ObjectId, ref: 'category' },
});

module.exports = mongoose.model('product', ProductSchema);
