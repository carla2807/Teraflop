const Product = require('../models/product');
const path = require('path');
var fs = require('fs');

//Metodo registrar
function registrar(req, res) {
  const data = req.body;
  if (req.files) {
    const imagen_path = req.files.imagen.path;
    const name = imagen_path.split(`\\`);
    const imagen_name = name[2];

    const product = new Product();
    product.titulo = data.titulo;
    product.imagen = imagen_name;
    product.descripcion = data.descripcion;
    product.modelo = data.modelo;
    product.precio = data.precio;
    product.stock = data.stock;
    product.marca = data.marca;
    product.nitproveedor = data.nitproveedor;
    product.nitcategoria = data.nitcategoria;

    product.save((err, product_save) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else if (product_save) {
        res.status(200).send({ product: product_save });
      } else {
        res.status(403).send({ message: 'El producto no se pudo registrar' });
      }
    });
  } else {
    const product = new Product();
    product.titulo = data.titulo;
    product.imagen = null;
    product.descripcion = data.descripcion;
    product.modelo = data.modelo;
    product.precio = data.precio;
    product.stock = data.stock;
    product.marca = data.marca;
    product.nitproveedor = data.nitproveedor;
    product.nitcategoria = data.nitcategoria;

    product.save((err, product_save) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else if (product_save) {
        res.status(200).send({ product: product_save });
      } else {
        res.status(403).send({ message: 'El producto no se pudo registrar' });
      }
    });
  }
}
//Metodo para obtener producto
function obtener_producto(req, res) {
  const id = req.params['id'];
  Product.findOne({ _id: id }, (err, product_data) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (product_data) {
        res.status(200).send({ product: product_data });
      } else {
        res.status(403).send({ message: 'El producto no existe' });
      }
    }
  });
}

//Metodo listar,populate permite relacionar las tablas
function listar_producto(req, res) {
  const titulo = req.params['titulo'];

  Product.find({ titulo: new RegExp(titulo, 'i') })
    .populate('marca')
    .populate('nitcategoria')
    .populate('nitproveedor')
    .exec((err, product_list) => {
      if (err) {
        res.status(500).send({ message: 'Error en el servidor' });
      } else {
        if (product_list) {
          res.status(200).send({ productos: product_list });
        } else {
          res.status(403).send({ message: 'No existe producto' });
        }
      }
    });
}
//Metodo editar producto
//Con el metodo unlink eliminamos imagen anterior que pasamos por parametro
function editar_producto(req, res) {
  const id = req.params['id'];
  var img = req.params['img'];
  const data = req.body;

  if (req.files.imagen) {
    if (img || img != null || img != undefined) {
      fs.unlink('./uploads/productos/' + img, (err) => {
        if (err) throw err;
      });
    }

    const imagen_path = req.files.imagen.path;
    const name = imagen_path.split(`\\`);
    const imagen_name = name[2];

    Product.findByIdAndUpdate(
      { _id: id },
      {
        titulo: data.titulo,
        imagen: imagen_name,
        descripcion: data.descripcion,
        modelo: data.modelo,
        precio: data.precio,
        marca: data.marca,
        nitproveedor: data.nitproveedor,
        nitcategoria: data.nitcategoria,
      },
      (err, producto_edit) => {
        if (err) {
          res.status(500).send({ message: 'Error en el servidor' });
        } else if (producto_edit) {
          res.status(200).send({ producto: producto_edit });
        } else {
          res
            .status(403)
            .send({ message: 'El producto no se pudo actualizar' });
        }
      }
    );
  } else {
    Product.findByIdAndUpdate(
      { _id: id },
      {
        titulo: data.titulo,
        descripcion: data.descripcion,
        modelo: data.modelo,
        precio: data.precio,
        marca: data.marca,
        nitcategoria: data.nitcategoria,
        nitproveedor: data.nitproveedor,
      },
      (err, producto_edit) => {
        if (err) {
          res.status(500).send({ message: 'Error en el servidor' });
        } else {
          if (producto_edit) {
            res.status(200).send({ producto: producto_edit });
          } else {
            res.status(403).send({ message: 'No se edito el producto' });
          }
        }
      }
    );
  }
}
//Metodo para eliminar producto
function eliminar_producto(req, res) {
  const id = req.params['id'];
  Product.findByIdAndRemove({ _id: id }, (err, producto_delete) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (producto_delete) {
        res.status(200).send({ producto: producto_delete });
      } else {
        res.status(403).send({ message: 'El producto no se pudo eliminar' });
      }
    }
  });
}
//Metodo actualizar stock
function actualizar_stock(req, res) {
  const id = req.params['id'];
  const data = req.body;
  Product.findById(id, (err, product_data) => {
    if (product_data) {
      Product.findByIdAndUpdate(
        id,
        { stock: parseInt(product_data.stock) + parseInt(data.stock) },
        (err, product_edit) => {
          if (product_edit) {
            res.status(200).send({ producto: product_edit });
          }
        }
      );
    } else {
      res.status(500).send(err);
    }
  });
}

//Metodo obtener imagen producto
function obtener_img(req, res) {
  const img = req.params['img'];

  if (img != 'null') {
    const path_img = './uploads/productos/' + img;
    res.status(200).sendFile(path.resolve(path_img));
  } else {
    const path_img = './uploads/productos/default.jpg';
    res.status(200).sendFile(path.resolve(path_img));
  }
}

module.exports = {
  registrar,
  listar_producto,
  editar_producto,
  obtener_producto,
  eliminar_producto,
  actualizar_stock,
  obtener_img,
};
