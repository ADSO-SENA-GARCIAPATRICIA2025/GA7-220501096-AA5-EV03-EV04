const parametros = new URLSearchParams(window.location.search);
const productoId = parametros.get('productoId') || '1';
const resumenProducto = document.getElementById('resumenProducto');
const listaVariantes = document.getElementById('listaVariantes');

const cargarProducto = async () => {
    const respuesta = await fetch(`/api/productos/${productoId}`);
    if (!respuesta.ok) throw new Error('No se pudo cargar el producto');

    const producto = await respuesta.json();
    resumenProducto.innerHTML = `
        <div>
            <span class="producto-codigo">${producto.codigoProducto}</span>
            <h2>${producto.nombreProducto}</h2>
        </div>
        <div class="producto-datos">
            <span><strong>Marca:</strong> ${producto.marca}</span>
            <span><strong>Público:</strong> ${producto.publicoObjetivo}</span>
            <span><strong>Precio:</strong> $${producto.precioVenta}</span>
        </div>
    `;
};

const cargarVariantes = async () => {
    const respuesta = await fetch(`/api/variantes/producto/${productoId}`);
    if (!respuesta.ok) throw new Error('No se pudieron cargar las variantes');

    const variantes = await respuesta.json();
    if (variantes.length === 0) {
        listaVariantes.innerHTML = '<tr><td colspan="6">Este producto no tiene variantes registradas.</td></tr>';
        return;
    }

    listaVariantes.innerHTML = variantes.map((variante) => `
        <tr>
            <td>${variante.id_varianteProducto}</td>
            <td>${variante.talla}</td>
            <td>${variante.color}</td>
            <td>${variante.stockActual}</td>
            <td>${Number(variante.estadoActivo) === 1 ? 'Activo' : 'Inactivo'}</td>
            <td>
                <a href="./variante-form.html?id=${variante.id_varianteProducto}&productoId=${productoId}" class="btn btn-warning btn-sm">
                    <i class="bi bi-pencil"></i> Editar
                </a>
                <button class="btn btn-danger btn-sm btn-eliminar-variante" data-id="${variante.id_varianteProducto}" data-color="${variante.color}" data-talla="${variante.talla}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
};

listaVariantes.addEventListener('click', async (evento) => {
    const boton = evento.target.closest('.btn-eliminar-variante');
    if (!boton) return;

    const { id, color, talla } = boton.dataset;
    if (!confirm(`¿Eliminar la variante talla ${talla}, color ${color}? Esta acción no se puede deshacer.`)) return;

    try {
        boton.disabled = true;
        const respuesta = await fetch(`/api/variantes/${id}`, { method: 'DELETE' });
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo eliminar la variante');
        await cargarVariantes();
    } catch (error) {
        console.error(error);
        alert(error.message);
        boton.disabled = false;
    }
});

Promise.all([cargarProducto(), cargarVariantes()]).catch((error) => {
    console.error(error);
    resumenProducto.innerHTML = '<span>No fue posible cargar la información.</span>';
});
