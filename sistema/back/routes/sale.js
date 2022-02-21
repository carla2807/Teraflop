const express = require('express');
const SaleController = require('../controllers/SaleController');

const api = express.Router();
//Metodos recibidos desde la controladora
api.post('/venta/registrar', SaleController.registrar);
api.get('/ventas', SaleController.listar);
api.get('/detalle/:id', SaleController.detalle_venta);
api.get('/venta/:id', SaleController.obtener_datos);
api.delete('/venta/eliminar/:id', SaleController.eliminar_venta);

module.exports = api;
