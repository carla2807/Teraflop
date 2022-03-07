//Inicializamos express
const express = require('express');
const userController = require('../controllers/UserController');

const api = express.Router();

//Metodos recibidos desde la controladora
api.post('/registrar', userController.registrar);
api.post('/login', userController.login);
api.get('/usuarios', userController.listar);
api.put('/user/editar/:id', userController.editar);
api.get('/user/:id', userController.get_usuario);
api.delete('/user/eliminar/:id', userController.eliminar);
module.exports = api;
