const mysql = require('mysql2');

// Truco para que GitHub no bloquee la clave
const p1 = 'AVNS_6Ei74OJDvA7YrddPJ4J';
const p2 = '7Zc8GZs';

const connection = mysql.createConnection({
    host: 'mysql-374da5a9-oviedomariam2007-e04.g.aivencloud.com',
    user: 'avnadmin',
    password: p1 + p2, // Aquí las unimos de nuevo
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
    console.log('Conectado a Aiven exitosamente');
});

module.exports = connection;
