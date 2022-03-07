const Marca = require('../models/marca');

//Metodo para registrar marca
function registrar(req, res) {
  const data = req.body;

  const marca = new Marca();
  marca.nombre = data.nombre;

  marca.save((err, marca_save) => {
    if (marca_save) {
      res.status(200).send({ marca: marca_save });
    } else {
      res.status(500).send(err);
    }
  });
}

//Metodo para listar marca
function listar(req, res) {
  const nombre = req.params['nombre'];

  Marca.find({ nombre: new RegExp(nombre, 'i') }, (err, marca_list) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (marca_list) {
        res.status(200).send({ marcas: marca_list });
      } else {
        res.status(403).send({ message: 'No existe la marca' });
      }
    }
  });
}

module.exports = {
  registrar,
  listar,
};
