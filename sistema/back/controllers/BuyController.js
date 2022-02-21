const Buy = require('../models/compra');
const BuyDetail = require('../models/detallecompra');

//Metodo para registrar compra y detalle
function registrar(req, res) {
  const data = req.body;
  const compra = new Buy();

  compra.total = data.total;
  compra.cantidad = data.cantidad;
  compra.precio = data.precio;
  compra.idusuario = data.idusuario;
  compra.nitproveedor = data.nitproveedor;

  compra.save((err, compra_save) => {
    if (compra_save) {
      const detalles = data.detalles;
      //Con foreach recorro variable detalles
      detalles.forEach((element, index) => {
        const detallecompra = new BuyDetail();
        detallecompra.idproducto = element.idproducto;

        detallecompra.total = element.total;
        detallecompra.cantidad = element.cantidad;
        detallecompra.precio = element.precio;

        detallecompra.compra = compra_save._id;

        detallecompra.save((err, detalle_save) => {
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

//Metodo para listar compras
function listar(req, res) {
  Buy.find()
    .populate('idusuario')
    .exec((err, data_buy) => {
      if (data_buy) {
        res.status(200).send({ buys: data_buy });
      } else {
        res.status(404).send({ message: 'No existe la compra' });
      }
    });
}
//Metodo para listar detalle compra
function detalle_compra(req, res) {
  const id = req.params['id'];
  BuyDetail.find({ compra: id })
    .populate('idproducto')
    .exec((err, data_detalle) => {
      if (data_detalle) {
        res.status(200).send({ detalles: data_detalle });
      } else {
        res.status(404).send({ message: 'No existe la compra' });
      }
    });
}
//Metodo obtener compra y detalle
function obtener_datos(req, res) {
  const id = req.params['id'];
  Buy.findById(id, (err, data_buy) => {
    if (data_buy) {
      BuyDetail.find({ compra: id }, (err, data_detalle) => {
        if (data_detalle) {
          res.status(200).send({
            compra: data_buy,
            detalles: data_detalle,
          });
        }
      });
    }
  });
}

module.exports = {
  registrar,
  listar,
  detalle_compra,
  obtener_datos,
};
