const Sale = require('../models/venta');
const SaleDetail = require('../models/detalleventa');

//Metodo para registrar venta y detalle
function registrar(req, res) {
  const data = req.body;
  const venta = new Sale();

  venta.total = data.total;
  venta.client = data.client;

  venta.save((err, venta_save) => {
    if (venta_save) {
      const detalles = data.detalles;
      //Con foreach recorro variable detalles
      detalles.forEach((element, index) => {
        const detalleventa = new SaleDetail();
        detalleventa.idproducto = element.idproducto;

        detalleventa.cantidad = element.cantidad;
        detalleventa.precio = element.precio;
        detalleventa.venta = venta_save._id;

        detalleventa.save((err, detalle_save) => {
          if (detalle_save) {
            res.status(200).send({ detalle: detalle_save });
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

//Metodo para listar ventas y unir con cliente
function listar(req, res) {
  Sale.find()
    .populate('client')
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
  Sale.findById(id, (err, data_sale) => {
    if (data_sale) {
      SaleDetail.find()
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

module.exports = {
  registrar,
  listar,
  detalle_venta,
  obtener_datos,
  eliminar_venta,
};
