const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

//Metodo para registrar
function registrar(req, res) {
  const params = req.body;

  const user = new User();

  if (params.password) {
    bcrypt.hash(params.password, null, null, function (err, hash) {
      if (hash) {
        user.password = hash;
        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.email = params.email;
        user.role = params.role;

        user.save((err, user_save) => {
          if (err) {
            res.status(500).send({ error: 'No se ingreso el usuario' });
          } else {
            res.status(200).send({ user: user_save });
          }
        });
      }
    });
  } else {
    res.status(403).send({ error: 'No ingreso contraseña' });
  }
}

//Metodo para login
function login(req, res) {
  const data = req.body;

  //consulta a mi usuario
  User.findOne({ email: data.email }, (err, user_data) => {
    if (err) {
      res.status(500).send({ message: 'error en el servidor' });
    } else {
      if (user_data) {
        bcrypt.compare(
          data.password,
          user_data.password,
          function (err, check) {
            if (check) {
              if (data.gettoken) {
                res.status(200).send({
                  jwt: jwt.createToken(user_data),
                  user: user_data,
                });
              } else {
                res.status(200).send({
                  user: user_data,
                  message: 'no token',
                  jwt: jwt.createToken(user_data),
                });
              }
            } else {
              res
                .status(403)
                .send({ message: 'El correo o contraseña no coinciden' });
            }
          }
        );
      } else {
        res.status(403).send({ message: 'El correo no existe' });
      }
    }
  });
}
//Metodo para listar
function listar(req, res) {
  User.find((err, users_data) => {
    if (users_data) {
      res.status(200).send({ usuarios: users_data });
    } else {
      res.status(403).send({ message: 'No existe el cliente ' });
    }
  });
}

//Metodo para obtener usuario
function get_usuario(req, res) {
  const id = req.params['id'];
  User.findById(id, (err, user_data) => {
    if (user_data) {
      res.status(200).send({ user: user_data });
    } else {
      res.status(403).send({ message: 'No existe el usuario ' });
    }
  });
}

//Metodo editar
function editar(req, res) {
  const id = req.params['id'];
  const data = req.body;

  //Este if me permite editar todos los campos
  if (data.password) {
    bcrypt.hash(data.password, null, null, function (err, hash) {
      if (hash) {
        User.findByIdAndUpdate(
          id,
          {
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            password: hash,
            role: data.role,
          },
          (err, user_edit) => {
            if (user_edit) {
              res.status(200).send({
                user: user_edit,
              });
            } else {
              res.status(500).send({ message: 'No se pudo editar usuario ' });
            }
          }
        );

        user.save((err, user_save) => {
          if (err) {
            res.status(500).send({ error: 'No se ingreso el usuario' });
          } else {
            res.status(200).send({ user: user_save });
          }
        });
      }
    });
  }
  //Este else es para editar campos pero no la contraseña
  else {
    User.findByIdAndUpdate(
      id,
      {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        role: data.role,
      },
      (err, user_edit) => {
        if (user_edit) {
          res.status(200).send({
            user: user_edit,
          });
        } else {
          res.status(500).send({ message: 'No se pudo editar usuario ' });
        }
      }
    );
  }
}
//Metodo eliminar
function eliminar(req, res) {
  const id = req.params['id'];
  User.findByIdAndRemove(id, (err, user_delete) => {
    if (user_delete) {
      res.status(200).send({ client: user_delete });
    } else {
      res.status(500).send(err);
    }
  });
}

module.exports = {
  registrar,
  login,
  listar,
  editar,
  eliminar,
  get_usuario,
};
