const express = require('express');
const MarcaController = require('../controllers/MarcaController');

const api = express.Router();
api.post('/marca/registrar', MarcaController.registrar);
api.get('/marcas/:nombre?', MarcaController.listar);
module.exports = api;
