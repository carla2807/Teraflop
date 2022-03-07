//Inicializamos express
const express = require('express');
const productController = require('../controllers/ProductController');
const multipart = require('connect-multiparty');
const path = multipart({ uploadDir: `./uploads/productos` });

const api = express.Router();

//Metodos recibidos desde la controladora
api.post('/producto/registrar', path, productController.registrar);
api.get('/producto/:id', productController.obtener_producto);
api.put('/producto/editar/:id/:img', path, productController.editar_producto);
api.put('/producto/stock/:id', productController.actualizar_stock);
api.delete('/producto/eliminar/:id', productController.eliminar_producto);
api.get('/productos/:titulo?', productController.listar_producto);
api.get('/producto/img/:img', productController.obtener_img);

module.exports = api;
