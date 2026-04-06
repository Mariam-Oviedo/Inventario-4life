const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const db = require('./db'); 

const app = express(); 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(express.static('public')); 

// LEER productos
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, result) => { 
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } 
        res.json(result); 
    });
});

// CREAR producto
app.post('/productos', (req, res) => {
    const { nombre, precio, categoria, stock } = req.body; 
    const sql = 'INSERT INTO productos (nombre, precio, categoria, stock) VALUES (?, ?, ?, ?)'; 
    db.query(sql, [nombre, precio, categoria, stock], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } 
        res.send('Producto 4Life agregado'); 
    });
});

// ELIMINAR producto
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params; 
    db.query('DELETE FROM productos WHERE id=?', [id], (err, result) => { 
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        } 
        res.send("Producto eliminado"); 
    });
});

// CAMBIO AQUÍ: Usar el puerto que asigne Render o el 3000 por defecto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});
