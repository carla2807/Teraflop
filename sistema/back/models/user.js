//Modelo usuario
//creo variable mongoose y la inicializo con mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
  nombre: String,
  apellido: String,
  email: String,
  password: String,
  role: String,

  createAtt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('user', UserSchema);
