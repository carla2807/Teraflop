//Inicializamos express
const express = require('express');
const providerController = require('../controllers/ProviderController');

const api = express.Router();

//Metodos recibidos desde la controladora
api.post('/proveedor/registrar', providerController.registrar);
api.get('/proveedor/registro/:id', providerController.obtener_proveedor);
api.put('/proveedor/editar/:id', providerController.editar_proveedor);
api.delete('/proveedor/eliminar/:id', providerController.eliminar_proveedor);
api.get('/proveedores/:nombre?', providerController.listar_proveedor);

module.exports = api;
