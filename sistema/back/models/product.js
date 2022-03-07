//Modelo producto
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  titulo: String,
  imagen: String,
  descripcion: String,
  modelo: String,
  precio: Number,
  stock: Number,

  marca: { type: Schema.ObjectId, ref: 'marca' },
  nitproveedor: { type: Schema.ObjectId, ref: 'provider' },
  nitcategoria: { type: Schema.ObjectId, ref: 'category' },
});

module.exports = mongoose.model('product', ProductSchema);
