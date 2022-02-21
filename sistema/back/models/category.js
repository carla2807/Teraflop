//Modelo categoria
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = Schema({
  nombre: String,
  descripcion: String,
});

module.exports = mongoose.model('category', CategorySchema);
