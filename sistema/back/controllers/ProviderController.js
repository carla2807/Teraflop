const Provider = require('../models/provider');

//Metodo registrar proveedor
function registrar(req, res) {
  const data = req.body;

  const provider = new Provider();

  provider.nombre = data.nombre;
  provider.direccion = data.direccion;
  provider.telefono = data.telefono;
  provider.website = data.website;
  provider.nitcategoria = data.nitcategoria;

  provider.save((err, provider_save) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (provider_save) {
        res.status(200).send({ provider: provider_save });
      } else {
        res.status(403).send({ message: 'El proveedor no se pudo registrar' });
      }
    }
  });
}

//Metodo para obtener proveedor
function obtener_proveedor(req, res) {
  const id = req.params['id'];
  Provider.findById({ _id: id }, (err, provider_data) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (provider_data) {
        res.status(200).send({ provider: provider_data });
      } else {
        res.status(403).send({ message: 'El proveedor no existe' });
      }
    }
  });
}

//Metodo para actualizar proveedor
function editar_proveedor(req, res) {
  const id = req.params['id'];
  const data = req.body;
  Provider.findByIdAndUpdate(
    { _id: id },
    {
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      website: data.website,
      nitcategoria: data.nitcategoria,
    },
    (err, provider_edit) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else {
        if (provider_edit) {
          res.status(200).send({ provider: provider_edit });
        } else {
          res
            .status(403)
            .send({ message: 'El proveedor no se pudo actualizar' });
        }
      }
    }
  );
}

//Metodo para eliminar proveedor
function eliminar_proveedor(req, res) {
  const id = req.params['id'];
  Provider.findByIdAndRemove({ _id: id }, (err, provider_delete) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (provider_delete) {
        res.status(200).send({ provider: provider_delete });
      } else {
        res.status(403).send({ message: 'El proveedor no se pudo eliminar' });
      }
    }
  });
}
//Metodo para listar
function listar_proveedor(req, res) {
  const nombre = req.params['nombre'];

  Provider.find({ nombre: new RegExp(nombre, 'i') })
    .populate('nitcategoria')
    .exec((err, provider_listado) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else {
        if (provider_listado) {
          res.status(200).send({ providers: provider_listado });
        } else {
          res.status(403).send({ message: 'No existe proveedor' });
        }
      }
    });
}

module.exports = {
  registrar,
  obtener_proveedor,
  editar_proveedor,
  eliminar_proveedor,
  listar_proveedor,
};
