const parametros = new URLSearchParams(window.location.search);
const fotoId = parametros.get('id');
const productoId = parametros.get('productoId');
const urlVolver = `./fotoProducto.html?productoId=${productoId}`;

document.getElementById('volverFotos').href = urlVolver;
document.getElementById('cancelarFoto').href = urlVolver;

const datosFoto = () => ({
    urlFoto: document.getElementById('urlFoto').value,
    orden: Number(document.getElementById('orden').value),
    estadoActivo: Number(document.getElementById('estadoActivo').value),
    id_producto: Number(productoId)
});

const configurarModoCrear = () => {
    document.title = 'Nueva foto - Footsy';
    document.getElementById('tituloFormulario').textContent = 'Nueva foto producto';
    document.getElementById('descripcionFormulario').textContent = 'Registra la URL y el orden de una nueva imagen para este producto.';
    document.getElementById('botonGuardar').innerHTML = '<i class="bi bi-plus-lg"></i> Crear foto';
    document.getElementById('estadoActivo').value = '1';
};

const cargarFoto = async () => {
    if (!productoId) throw new Error('Falta el producto');
    if (!fotoId) {
        configurarModoCrear();
        return;
    }

    const respuesta = await fetch(`/api/fotos/${fotoId}`);
    if (!respuesta.ok) throw new Error('No se pudo cargar la foto');

    const foto = await respuesta.json();
    document.getElementById('urlFoto').value = foto.urlFoto;
    document.getElementById('orden').value = foto.orden;
    document.getElementById('estadoActivo').value = Number(foto.estadoActivo);
};

document.getElementById('formFoto').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    try {
        const respuesta = await fetch(
            fotoId ? `/api/fotos/${fotoId}` : '/api/fotos',
            {
                method: fotoId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosFoto())
            }
        );
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo guardar la foto');
        window.location.href = urlVolver;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

cargarFoto().catch((error) => {
    console.error(error);
    alert(error.message);
});
