const Sale = require('../models/venta');
const SaleDetail = require('../models/detalleventa');
const Product = require('../models/product');

//Metodo para registrar venta y detalle
function registrar(req, res) {
  const data = req.body;
  const venta = new Sale();

  venta.client = data.client;
  venta.user = data.user;
  venta.estado = 'En preparación';

  venta.save((err, venta_save) => {
    if (venta_save) {
      const detalles = data.detalles;
      //Con foreach recorro variable detalles
      detalles.forEach((element, index) => {
        const detalleventa = new SaleDetail();

        detalleventa.idproducto = element.idproducto;
        detalleventa.cantidad = element.cantidad;
        detalleventa.venta = venta_save._id;

        detalleventa.save((err, detalle_save) => {
          if (detalle_save) {
            Product.findById(
              { _id: element.idproducto },
              (err, product_data) => {
                if (product_data) {
                  Product.findByIdAndUpdate(
                    { _id: product_data._id },
                    {
                      //obtengo el stock actual y luego lo resto de la cantidad
                      //con parseInt lo convierte a entero para la resta
                      stock:
                        parseInt(product_data.stock) -
                        parseInt(element.cantidad),
                    },
                    (err, product_edit) => {
                      res.end();
                    }
                  );
                } else {
                  res.send(err);
                }
              }
            );
            //res.status(200).send({ detalle: detalle_save });
          } else {
            res.send(err);
          }
        });
      });
    } else {
      res.send(err);
    }
  });
}

//Metodo para listar ventas y unir con cliente,vendedor
function listar(req, res) {
  Sale.find()
    .populate('client')
    .populate('user')
    .exec((err, data_sale) => {
      if (data_sale) {
        res.status(200).send({ sales: data_sale });
      } else {
        res.status(404).send({ message: 'No existe la venta' });
      }
    });
}
//Metodo para listar detalle venta
function detalle_venta(req, res) {
  const id = req.params['id'];
  SaleDetail.find({ venta: id })
    .populate('idproducto')
    .exec((err, data_detalle) => {
      if (data_detalle) {
        res.status(200).send({ detalles: data_detalle });
      } else {
        res.status(404).send({ message: 'No existe la venta' });
      }
    });
}

//Metodo obtener venta y detalle-MODIFICADA
function obtener_datos(req, res) {
  const id = req.params['id'];
  Sale.findById(id)
    .populate('client')
    .populate('user')
    .exec((err, data_sale) => {
      if (data_sale) {
        SaleDetail.find({ venta: data_sale._id })
          .populate('idproducto')
          .exec({ venta: id }, (err, data_detalle) => {
            if (data_detalle) {
              res.status(200).send({
                data: {
                  venta: data_sale,
                  detalles: data_detalle,
                },
              });
            }
          });
      }
    });
}

//Eliminar venta
function eliminar_venta(req, res) {
  const id = req.params['id'];
  Sale.findByIdAndRemove({ _id: id }, (err, sale_delete) => {
    if (err) {
      res.status(500).send({ message: 'Error en el servidor' });
    } else {
      if (sale_delete) {
        res.status(200).send({ sale: sale_delete });
      } else {
        res.status(403).send({ message: 'La venta no se pudo eliminar' });
      }
    }
  });
}

function cambiar_estado(req, res) {
  //aca va la logica para cambiar el estado en mongodb
  const data = req.body;
  const id = data.id,
    estado = data.estado;
  let estadoNuevo;
  let estadoErr = false;

  switch (estado) {
    case 'En preparación':
      estadoNuevo = 'En camino';
      break;
    case 'En camino':
      estadoNuevo = 'Recibido';
      break;
    default:
      estadoErr = true;
      res
        .status(400)
        .send({ message: 'No se puede avanzar un estado finalizado.' });
  }
  if (estadoErr == false) {
    Sale.findById(id).exec((err, data_sale) => {
      if (err) {
        res.status(404).send({ message: 'Recurso no encontrado.' });
      } else {
        if (data_sale) {
          if (data_sale.estado != estado) {
            res.status(400).send({ message: 'Estado inválido.' });
          } else {
            Sale.findByIdAndUpdate(
              id,
              {
                estado: estadoNuevo,
              },
              (err, venta_edit) => {
                if (err) {
                  res.status(500).send({ message: 'Error en el servidor.' });
                } else {
                  res.status(200).send({
                    message: 'El estado fue cambiado con éxito',
                    estadoAnterior: estado,
                    estadoNuevo: venta_edit.estado,
                  });
                }
              }
            );
          }
        }
      }
    });
  }
}

module.exports = {
  registrar,
  listar,
  detalle_venta,
  obtener_datos,
  eliminar_venta,
  cambiar_estado,
};
