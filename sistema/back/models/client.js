//Modelo cliente
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = Schema({
  nombre: String,
  apellido: String,
  email: String,
  direccion: String,
  telefono: Number,
  ciudad: String,
  codigopostal: Number,
  pais: String,

  createAtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('client', ClientSchema);
