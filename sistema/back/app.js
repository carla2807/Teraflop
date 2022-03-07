//Creo variable express y le asigno modulo express
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');

//Creo puerto y le asigno servidor
const PORT = process.env.PORT || 4201;
//Inicializo express
const app = express();

//CORS
app.use(cors());
//SWAGGER
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'A simple Express Library API',
      termsOfService: 'http://example.com/terms/',
      contact: {
        name: 'API Support',
        url: 'http://www.exmaple.com/support',
        email: 'support@example.com',
      },
    },

    servers: [
      {
        url: 'http://localhost:4001',
        description: 'My API Documentation',
      },
    ],
  },
  apis: ['./Routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//RUTAS
const user_routes = require('./routes/user');
const category_routes = require('./routes/category');
const provider_routes = require('./routes/provider');
const product_routes = require('./routes/product');
const marca_routes = require('./routes//marca');
const buy_routes = require('./routes/buy');
const client_routes = require('./routes/client');
const sale_routes = require('./routes/sale');

//conectamos base de datos con la aplicacion
mongoose.connect('mongodb://localhost:27017/sistema', (err, resp) => {
  if (err) {
    throw err;
  } else {
    console.log('corriendo servidor ');
    app.listen(PORT, function () {
      console.log('servidor OK', +PORT);
    });
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Content-Type: application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

//Pongo en funcionamiento las rutas
app.use('/api', user_routes);
app.use('/api', category_routes);
app.use('/api', provider_routes);
app.use('/api', product_routes);
app.use('/api', marca_routes);
app.use('/api', buy_routes);
app.use('/api', client_routes);
app.use('/api', sale_routes);

module.exports = app;
