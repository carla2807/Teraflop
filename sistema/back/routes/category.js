const express = require('express');
const categoryController = require('../controllers/CategoryController');

const api = express.Router();

//Metodos recibidos desde la controladora
api.post('/categoria/registrar', categoryController.registrar);
api.get('/categoria/:id', categoryController.obtener_categoria);
api.put('/categoria/editar/:id', categoryController.editar_categoria);
api.delete('/categoria/eliminar/:id', categoryController.eliminar_categoria);
api.get('/categorias/:nombre?', categoryController.listar_categoria);
module.exports = api;
