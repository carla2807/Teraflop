const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'carla';

//creo funcion createToken para generar y la exporto
exports.createToken = function (user) {
  const payload = {
    sub: user._id,
    nombre: user.nombre,
    apellido: user.apellido,
    email: user.email,
    role: user.role,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix(),
  };
  return jwt.encode(payload, secret);
};
