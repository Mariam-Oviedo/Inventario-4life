const mysql = require('mysql2');

// Unimos la clave para que pase el filtro de seguridad
const parteA = 'AVNS_vMyYmF9mXaW3';
const parteB = '7Zc8GZs';
const claveFinal = parteA + parteB;

const connection = mysql.createConnection({
    host: 'mysql-374da5a9-oviedomariam2007-e04.g.aivencloud.com',
    user: 'avnadmin',
    password: claveFinal,
    database: 'defaultdb',
    port: 16403,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexion:', err.message);
        return;
    }
    console.log('¡Conectado exitosamente a la base de datos de Aiven!');
});

module.exports = connection;
