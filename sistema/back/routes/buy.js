const express = require('express');
const BuyController = require('../controllers/BuyController');

const api = express.Router();
//Metodos recibidos desde la controladora
api.post('/compra/registrar', BuyController.registrar);
api.get('/compras', BuyController.listar);
api.get('/compra/data/:id', BuyController.detalle_compra);
api.get('/compra/datos/:id', BuyController.obtener_datos);
module.exports = api;
