const mysql = require('mysql2');

//Conexión a la BBDD
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mercadoiters',
});

connection.connect((error) => {
  if (error) {
    console.log('Error al conectar a la bd');
  } else {
    console.log('Conectado a la bd exitosamente');
  }
});

module.exports = connection;
