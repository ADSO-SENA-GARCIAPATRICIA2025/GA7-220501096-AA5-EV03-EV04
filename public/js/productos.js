
const listaProductos = document.getElementById('listaProductos');


const cargarProductos = async () => {
    try {
        const respuesta = await fetch('/api/productos');
        const productos = await respuesta.json();

        listaProductos.innerHTML = '';

                        productos.forEach(producto => {
                    listaProductos.innerHTML += `
                        <tr>
                            <td>${producto.codigoProducto}</td>
                            <td>${producto.nombreProducto}</td>
                            <td>${producto.marca}</td>
                            <td>${producto.categoria}</td>
                            <td>$${producto.precioVenta}</td>
                            <td>${producto.publicoObjetivo}</td>
                            <td>${producto.estadoActivo}</td>
                            <td>
                               

                               <a href="./producto-form.html?id=${producto.id_producto}"
                                    class="btn btn-warning btn-sm">
                                        <i class="bi bi-pencil"></i> Editar
                                    </a>
                                <button
                                    class="btn btn-danger btn-sm btn-eliminar"
                                    data-id="${producto.id_producto}"
                                    data-nombre="${producto.nombreProducto}">
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                            </td>
                        </tr>
                    `;
                });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

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

        if (!respuesta.ok) {
            throw new Error(resultado.mensaje || 'No se pudo eliminar el producto');
        }

        await cargarProductos();
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert(error.message);
        botonEliminar.disabled = false;
    }
});

cargarProductos();
