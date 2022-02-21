//Modelo proveedor
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProviderSchema = Schema({
  nombre: String,
  direccion: String,
  telefono: Number,
  website: String,
  nitcategoria: { type: Schema.ObjectId, ref: 'category' },
});

module.exports = mongoose.model('provider', ProviderSchema);
