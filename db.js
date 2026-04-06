const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mariam', // Reemplaza esto por tu contraseña de MySQL
    database: 'productos_4life'     // Asegúrate de que este nombre sea el correcto
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos productos_4life');
});

module.exports = connection;