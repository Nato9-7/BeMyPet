const express = require('express');
const mysql = require('mysql2'); // Cambiar a mysql2
const cors = require('cors');
const app = express();

// Usar CORS
app.use(cors());

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
  host: 'autorack.proxy.rlwy.net',
  user: 'root',
  password: 'otsaiEvocObBeAeAZRPqRUeeKIuxxVEC',
  database: 'bemypet',
  port: 17101,
  connectTimeout: 20000, // Tiempo de espera
});

// Conectar a MySQL
db.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conexión a MySQL exitosa');
});

// Ruta para obtener los usuarios
app.get('/usuarios', (req, res) => {
  let sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Error en la consulta');
      return;
    }
    res.json(results);
  });
});

// Iniciar el servidor
app.listen(17101, () => {
  console.log('Servidor corriendo en el puerto 17101');
});
