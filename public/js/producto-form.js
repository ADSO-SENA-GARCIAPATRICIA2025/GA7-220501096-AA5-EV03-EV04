const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get('id');
const formulario = document.getElementById('formProducto');

const cargarCategorias = async (idCategoriaProducto = '') => {
    const respuesta = await fetch('/api/categorias');
    if (!respuesta.ok) throw new Error('No se pudieron cargar las categorías');

    const categorias = await respuesta.json();
    const selectCategoria = document.getElementById('id_categoria');
    selectCategoria.innerHTML = '<option value="">Seleccione una categoría</option>';
    categorias.forEach(({ id_categoria, nombre }) => {
        selectCategoria.innerHTML += `<option value="${id_categoria}">${nombre}</option>`;
    });
    selectCategoria.value = idCategoriaProducto;
};

const cargarVariantes = async (productoId) => {
    const respuesta = await fetch(`/api/variantes/producto/${productoId}`);
    if (!respuesta.ok) throw new Error('No se pudieron cargar las variantes');

    const variantes = await respuesta.json();
    const listaVariantes = document.getElementById('listaVariantes');
    const seccionVariantes = document.getElementById('seccionVariantes');
    seccionVariantes.hidden = false;

    if (variantes.length === 0) {
        listaVariantes.innerHTML = '<tr><td colspan="5">Este producto todavía no tiene variantes registradas.</td></tr>';
        return;
    }

    listaVariantes.innerHTML = variantes.map((variante) => `
        <tr>
            <td>${variante.id_varianteProducto}</td>
            <td>${variante.talla}</td>
            <td>${variante.color}</td>
            <td>${variante.stockActual}</td>
            <td>${Number(variante.estadoActivo) === 1 ? 'Activo' : 'Inactivo'}</td>
        </tr>
    `).join('');
};

const cargarProducto = async () => {
    await cargarCategorias();
    if (!idProducto) {
        document.getElementById('tituloFormulario').textContent = 'Crear producto';
        return;
    }

    const respuesta = await fetch(`/api/productos/${idProducto}`);
    if (!respuesta.ok) throw new Error('No se pudo cargar el producto');
    const producto = await respuesta.json();

    document.getElementById('idProducto').value = producto.id_producto;
    document.getElementById('codigoProducto').value = producto.codigoProducto;
    document.getElementById('nombreProducto').value = producto.nombreProducto;
    document.getElementById('marca').value = producto.marca;
    document.getElementById('precioVenta').value = producto.precioVenta;
    document.getElementById('publicoObjetivo').value = producto.publicoObjetivo;
    document.getElementById('descripcion').value = producto.descripcion;
    await cargarCategorias(producto.id_categoria);
    await cargarVariantes(producto.id_producto);
};

const datosProducto = () => ({
    codigoProducto: document.getElementById('codigoProducto').value,
    nombreProducto: document.getElementById('nombreProducto').value,
    marca: document.getElementById('marca').value,
    precioVenta: Number(document.getElementById('precioVenta').value),
    publicoObjetivo: document.getElementById('publicoObjetivo').value,
    descripcion: document.getElementById('descripcion').value,
    id_categoria: Number(document.getElementById('id_categoria').value)
});

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    try {
        const respuesta = await fetch(
            idProducto ? `/api/productos/${idProducto}` : '/api/productos',
            {
                method: idProducto ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosProducto())
            }
        );
        if (!respuesta.ok) {
            throw new Error(idProducto ? 'No se pudo actualizar el producto' : 'No se pudo crear el producto');
        }

        window.location.href = './producto.html';
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

cargarProducto().catch((error) => {
    console.error(error);
    alert(error.message);
});
