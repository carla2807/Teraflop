const client = require('../models/client');
const Client = require('../models/client');

//Metodo para registrar cliente
function registrar_cliente(req, res) {
  const data = req.body;
  const client = new Client();

  client.nombre = data.nombre;
  client.apellido = data.apellido;
  client.email = data.email;
  client.direccion = data.direccion;
  client.telefono = data.telefono;
  client.ciudad = data.ciudad;
  client.codigopostal = data.codigopostal;
  client.pais = data.pais;

  client.save((err, client_save) => {
    if (client_save) {
      res.status(200).send({ client: client_save });
    } else {
      res.status(500).send(err);
    }
  });
}

//Metodo listar cliente
function listar_cliente(req, res) {
  Client.find((err, client_data) => {
    if (client_data) {
      res.status(200).send({ clientes: client_data });
    } else {
      res.status(403).send({ message: 'No existe el cliente ' });
    }
  });
}
//
function get_cliente(req, res) {
  const id = req.params['id'];
  Client.findById(id, (err, client_data) => {
    if (client_data) {
      res.status(200).send({ client: client_data });
    }
  });
}

//Metodo actualizar cliente
function editar_cliente(req, res) {
  const id = req.params['id'];
  const data = req.body;
  Client.findByIdAndUpdate(
    id,
    {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      direccion: data.direccion,
      telefono: data.telefono,
      ciudad: data.ciudad,
      codigopostal: data.codigopostal,
      pais: data.pais,
    },
    (err, client_edit) => {
      if (client_edit) {
        res.status(200).send({ client: client_edit });
      } else {
        res.status(500).send(err);
      }
    }
  );
}

//Metodo eliminar cliente
function eliminar_cliente(req, res) {
  const id = req.params['id'];
  Client.findByIdAndRemove(id, (err, client_delete) => {
    if (client_delete) {
      res.status(200).send({ client: client_delete });
    } else {
      res.status(500).send(err);
    }
  });
}
module.exports = {
  registrar_cliente,
  listar_cliente,
  editar_cliente,
  eliminar_cliente,
  get_cliente,
};
