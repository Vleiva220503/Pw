require('dotenv').config();
const mysql = require('mysql2');

// Crear la conexión con las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306, // Usa el puerto por defecto si no está definido
  connectTimeout: parseInt(process.env.CONNECTION_TIMEOUT) || 10000, // Timeout de 10s por defecto
});

// Probar la conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos:', process.env.DB_DATABASE);
});

// Opcional: Cerrar la conexión al terminar (solo para pruebas)
connection.end();
