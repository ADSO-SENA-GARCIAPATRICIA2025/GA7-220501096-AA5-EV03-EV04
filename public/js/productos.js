const listaProductos = document.getElementById('listaProductos');

const cargarProductos = async () => {
    try {
        const respuesta = await fetch('/productos');
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
                               

                                <button onclick="editarProducto(${producto.id_producto})"
                                    class="btn btn-warning btn-sm">
                                    <i class="bi bi-pencil"> Editar</i>
                                </button>
                                <button 
                                    class="btn btn-danger btn-sm">
                                    <i class="bi bi-trash"> Eliminar</i>
                                </button>
                            </td>
                        </tr>
                    `;
                });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

cargarProductos();