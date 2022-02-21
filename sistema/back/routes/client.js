const express = require('express');
const ClientController = require('../controllers/ClientController');

const api = express.Router();
//Metodos recibidos desde la controladora
api.post('/cliente/registrar', ClientController.registrar_cliente);
api.get('/clientes', ClientController.listar_cliente);
api.put('/cliente/editar/:id', ClientController.editar_cliente);
api.delete('/cliente/eliminar/:id', ClientController.eliminar_cliente);
api.get('/cliente/:id', ClientController.get_cliente);
module.exports = api;
