const express = require('express');
const router = express.Router(); //Objeto Router (ruteador)
const connection = require('../connection'); //Objeto connection

//ENDPOINTS - CRUD - Rutas Dinámicas:

//LISTAR publicaciones
router.get('/', (req, res) => {
  if (req.session.user) {
    console.log('El usuario ya inició sesión con email y contraseña');
  } else {
    console.log('Usuario desconocido');
  }

  const sql = `SELECT *
                FROM publicaciones`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.json({ message: 'Error al obtener las publicaciones' });
    } else {
      res.json(result);
    }
  });
});

//INSERTAR o agregar una publicación
router.post('/', (req, res) => {
  const sql = `INSERT INTO publicaciones(titulo, descripcion, precio, stock, id_condicion, imagen, fecha_publicacion, id_usuario, id_categoria)
                 VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    req.body.titulo,
    req.body.descripcion,
    req.body.precio,
    req.body.stock,
    req.body.id_condicion,
    req.body.imagen,
    req.body.fecha_publicacion,
    req.body.id_usuario,
    req.body.id_categoria,
  ];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.json({ message: 'Error al agregar la publicacion' });
    } else {
      res.json(result);
    }
  });
});

//MODIFICAR publicación
router.put('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `UPDATE publicaciones
                 SET titulo = ?,
                     descripcion = ?,
                     precio = ?,
                     stock = ?,
                     id_condicion = ?,
                     imagen = ?,
                     fecha_publicacion = ?,
                     id_usuario = ?,
                     id_categoria = ?
                 WHERE id = ?`;

  const values = [
    req.body.titulo,
    req.body.descripcion,
    req.body.precio,
    req.body.stock,
    req.body.id_condicion,
    req.body.imagen,
    req.body.fecha_publicacion,
    req.body.id_usuario,
    req.body.id_categoria,
    id,
  ];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.json({ message: 'Error al modificar la publicacion' });
    } else {
      res.json(result);
    }
  });
});

//BORRAR publicación
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM publicaciones
                 WHERE id = ?`;

  const values = [id];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.json({ message: 'Error al eliminar la publicacion' });
    } else {
      res.json(result);
    }
  });
});

module.exports = router; //para exportar el objeto router
