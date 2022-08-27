const express = require('express');

const router = express.Router();

const connection = require('../connection');

//Iniciar Sesión:
router.post('/', (req, res) => {
  const { email, password } = req.body; //saco los 2 valores q necesito

  const sql = `SELECT * 
                FROM usuarios 
                WHERE email=? AND password=?`; // '?' xa evitar la inyeccion sql

  const values = [email, password]; // xa guardar los valores '?'

  //mando a ejecutar la consulta y le mando los valores
  //tambien la funcion xa ver si hubo errores
  connection.query(sql, values, (error, result) => {
    if (error) {
      res.status(500).json({ message: 'Error al iniciar sesión' }); //problema en el servidor
    } else {
      if (result.length === 1) {
        req.session.user = result; //acá grabo los datos d quien está logueado

        res.json({ user: `${result[0].nombre} ${result[0].apellido}` });
      } else {
        res.status(401).json({ message: 'Usuario y/o contraseña incorrectos' }); //datos incorrectos
      }
    }
  });
});

module.exports = router;
