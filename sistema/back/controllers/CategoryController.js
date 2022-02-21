const Category = require('../models/category');

//Metodo para registrar
function registrar(req, res) {
  const data = req.body;

  // instanciar modelo
  const category = new Category();
  category.nombre = data.nombre;
  category.descripcion = data.descripcion;

  category.save((err, category_save) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (category_save) {
        res.status(200).send({ category: category_save });
      } else {
        res.status(403).send({ message: 'La categoria no se pudo registrar' });
      }
    }
  });
}
//Metodo para obtener categoria
function obtener_categoria(req, res) {
  const id = req.params['id'];
  Category.findById({ _id: id }, (err, category_data) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (category_data) {
        res.status(200).send({ category: category_data });
      } else {
        res.status(403).send({ message: 'La categoria no existe' });
      }
    }
  });
}

//Funcion para actualizar categoria
function editar_categoria(req, res) {
  const id = req.params['id'];
  const data = req.body;
  Category.findByIdAndUpdate(
    { _id: id },
    { nombre: data.nombre, descripcion: data.descripcion },
    (err, category_edit) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else {
        if (category_edit) {
          res.status(200).send({ category: category_edit });
        } else {
          res
            .status(403)
            .send({ message: 'La categoria no se pudo actualizar' });
        }
      }
    }
  );
}
//Metodo para eliminar categoria
function eliminar_categoria(req, res) {
  const id = req.params['id'];
  Category.findByIdAndRemove({ _id: id }, (err, category_delete) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (category_delete) {
        res.status(200).send({ category: category_delete });
      } else {
        res.status(403).send({ message: 'La categoria no se pudo eliminar' });
      }
    }
  });
}
//Metodo para listar
function listar_categoria(req, res) {
  const nombre = req.params['nombre'];

  Category.find({ nombre: new RegExp(nombre, 'i') }, (err, category_list) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (category_list) {
        res.status(200).send({ categories: category_list });
      } else {
        res.status(403).send({ message: 'No existe categoria' });
      }
    }
  });
}
module.exports = {
  registrar,
  obtener_categoria,
  editar_categoria,
  eliminar_categoria,
  listar_categoria,
};
