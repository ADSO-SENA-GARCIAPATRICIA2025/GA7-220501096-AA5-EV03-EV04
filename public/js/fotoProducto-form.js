const parametros = new URLSearchParams(window.location.search);
const fotoId = parametros.get('id');
const productoId = parametros.get('productoId');
const urlVolver = `./fotoProducto.html?productoId=${productoId}`;

document.getElementById('volverFotos').href = urlVolver;
document.getElementById('cancelarFoto').href = urlVolver;

const cargarFoto = async () => {
    if (!fotoId || !productoId) throw new Error('Falta la foto o el producto');
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
        const respuesta = await fetch(`/api/fotos/${fotoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                urlFoto: document.getElementById('urlFoto').value,
                orden: Number(document.getElementById('orden').value),
                estadoActivo: Number(document.getElementById('estadoActivo').value),
                id_producto: Number(productoId)
            })
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo actualizar la foto');
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
