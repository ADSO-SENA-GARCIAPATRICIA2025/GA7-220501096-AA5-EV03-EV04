const parametros = new URLSearchParams(window.location.search);
const productoId = parametros.get('productoId') || '1';
const resumenProducto = document.getElementById('resumenProducto');
const listaFotos = document.getElementById('listaFotos');

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

const cargarFotos = async () => {
    const respuesta = await fetch(`/api/fotos/producto/${productoId}`);
    if (!respuesta.ok) throw new Error('No se pudieron cargar las fotos');

    const fotos = await respuesta.json();
    if (fotos.length === 0) {
        listaFotos.innerHTML = '<tr><td colspan="5">Este producto no tiene fotos registradas.</td></tr>';
        return;
    }

    listaFotos.innerHTML = fotos.map((foto) => `
        <tr>
            <td><img class="miniatura-foto" src="${foto.urlFoto}" alt="Foto ${foto.orden} del producto"></td>
            <td>${foto.id_foto}</td>
            <td>${foto.orden}</td>
            <td>${Number(foto.estadoActivo) === 1 ? 'Activo' : 'Inactivo'}</td>
            <td>
                <a href="./fotoProducto-form.html?id=${foto.id_foto}&productoId=${productoId}" class="btn btn-warning btn-sm">
                    <i class="bi bi-pencil"></i> Editar
                </a>
                <button class="btn btn-danger btn-sm btn-eliminar-foto" data-id="${foto.id_foto}" data-orden="${foto.orden}">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>
    `).join('');
};

listaFotos.addEventListener('click', async (evento) => {
    const boton = evento.target.closest('.btn-eliminar-foto');
    if (!boton) return;

    const { id, orden } = boton.dataset;
    if (!confirm(`¿Eliminar la foto con orden ${orden}? Esta acción no se puede deshacer.`)) return;

    try {
        boton.disabled = true;
        const respuesta = await fetch(`/api/fotos/${id}`, { method: 'DELETE' });
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo eliminar la foto');
        await cargarFotos();
    } catch (error) {
        console.error(error);
        alert(error.message);
        boton.disabled = false;
    }
});

Promise.all([cargarProducto(), cargarFotos()]).catch((error) => {
    console.error(error);
    resumenProducto.innerHTML = '<span>No fue posible cargar la información.</span>';
});
