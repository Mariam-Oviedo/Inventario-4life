const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// OBTENER PRODUCTOS
app.get('/productos', (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// AGREGAR PRODUCTO
app.post('/productos', (req, res) => {
    const { nombre, precio_socio, precio_cliente, cantidad } = req.body;
    const query = 'INSERT INTO productos (nombre, precio_socio, precio_cliente, cantidad) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, precio_socio, precio_cliente, cantidad], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, ...req.body });
    });
});

// EDITAR PRODUCTO (NUEVO)
app.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio_socio, precio_cliente, cantidad } = req.body;
    const query = 'UPDATE productos SET nombre=?, precio_socio=?, precio_cliente=?, cantidad=? WHERE id=?';
    db.query(query, [nombre, precio_socio, precio_cliente, cantidad, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Actualizado correctamente" });
    });
});

// ELIMINAR PRODUCTO (NUEVO)
app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "Eliminado correctamente" });
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
