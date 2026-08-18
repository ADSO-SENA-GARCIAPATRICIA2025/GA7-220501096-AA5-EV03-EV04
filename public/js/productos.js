const listaProductos = document.getElementById('listaProductos');
const buscadorCodigo = document.getElementById('buscarCodigo');
let productos = [];

// Solo cambia la presentación en pantalla; no modifica el valor usado en cálculos.
const formatearPrecio = (precio) =>
    new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(Number(precio));

const mostrarProductos = (productosAMostrar) => {
    if (productosAMostrar.length === 0) {
        listaProductos.innerHTML = '<tr><td colspan="8">No se encontraron productos con ese código.</td></tr>';
        return;
    }

    listaProductos.innerHTML = productosAMostrar.map((producto) => `
        <tr>
            <td>${producto.codigoProducto}</td>
            <td>${producto.nombreProducto}</td>
            <td>${producto.marca}</td>
            <td>${producto.categoria}</td>
            <td>${formatearPrecio(producto.precioVenta)}</td>
            <td>${producto.publicoObjetivo}</td>
            <td>${producto.estadoActivo}</td>
            <td>
                <a href="./producto-form.html?id=${producto.id_producto}" class="btn btn-warning btn-sm">
                    <i class="bi bi-pencil"></i> Editar
                </a>
                <a href="./variantes.html?productoId=${producto.id_producto}" class="btn btn-info btn-sm">
                    <i class="bi bi-layers"></i> Variantes
                </a>
                <a href="./fotoProducto.html?productoId=${producto.id_producto}" class="btn btn-secondary btn-sm">
                    <i class="bi bi-images"></i> Fotos
                </a>
                <button class="btn btn-danger btn-sm btn-eliminar"
                    data-id="${producto.id_producto}" data-nombre="${producto.nombreProducto}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
};

const cargarProductos = async () => {
    try {
        const respuesta = await fetch('/api/productos');
        if (!respuesta.ok) throw new Error('No se pudieron cargar los productos');

        productos = await respuesta.json();
        const termino = buscadorCodigo.value.trim().toLowerCase();
        mostrarProductos(productos.filter((producto) =>
            producto.codigoProducto.toLowerCase().includes(termino)
        ));
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        listaProductos.innerHTML = '<tr><td colspan="8">No se pudieron cargar los productos.</td></tr>';
    }
};

buscadorCodigo.addEventListener('input', () => {
    const termino = buscadorCodigo.value.trim().toLowerCase();
    const coincidencias = productos.filter((producto) =>
        producto.codigoProducto.toLowerCase().includes(termino)
    );
    mostrarProductos(coincidencias);
});

listaProductos.addEventListener('click', async (evento) => {
    const botonEliminar = evento.target.closest('.btn-eliminar');
    if (!botonEliminar) return;

    const { id, nombre } = botonEliminar.dataset;
    const confirmar = confirm(
        `¿Eliminar el producto "${nombre}"? También se eliminarán sus variantes y fotos. Esta acción no se puede deshacer.`
    );
    if (!confirmar) return;

    try {
        botonEliminar.disabled = true;
        const respuesta = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo eliminar el producto');

        await cargarProductos();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert(error.message);
        botonEliminar.disabled = false;
    }
});

cargarProductos();
