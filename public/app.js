const form = document.getElementById('producto-form');
const inventarioDiv = document.getElementById('inventario');

// Función para cargar productos desde el servidor
async function cargarProductos() {
    const res = await fetch('/productos');
    const productos = await res.json();
    inventarioDiv.innerHTML = '';
    productos.forEach(p => {
        inventarioDiv.innerHTML += `
            <div class="producto-card">
                <h4>${p.nombre}</h4>
                <p>Categoría: ${p.categoria}</p>
                <p>Precio: $${p.precio}</p>
                <p>Stock: ${p.stock}</p>
                <button onclick="eliminarProducto(${p.id})" class="btn-eliminar">Eliminar</button>
            </div>
        `;
    });
}

// Evento para guardar producto
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nuevo = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        categoria: document.getElementById('categoria').value,
        stock: document.getElementById('stock').value
    };
    await fetch('/productos', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(nuevo)
    });
    form.reset();
    cargarProductos();
});

// Función para eliminar
async function eliminarProducto(id) {
    await fetch(`/productos/${id}`, { method: 'DELETE' });
    cargarProductos();
}

cargarProductos(); // Carga inicial