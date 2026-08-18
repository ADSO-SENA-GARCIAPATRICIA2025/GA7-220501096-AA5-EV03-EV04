const parametros = new URLSearchParams(window.location.search);
const varianteId = parametros.get('id');
const productoId = parametros.get('productoId');
const urlVolver = `./variantes.html?productoId=${productoId}`;

document.getElementById('volverVariantes').href = urlVolver;
document.getElementById('cancelarVariante').href = urlVolver;

const cargarVariante = async () => {
    if (!varianteId || !productoId) throw new Error('Falta la variante o el producto');
    const respuesta = await fetch(`/api/variantes/${varianteId}`);
    if (!respuesta.ok) throw new Error('No se pudo cargar la variante');

    const variante = await respuesta.json();
    document.getElementById('talla').value = variante.talla;
    document.getElementById('color').value = variante.color;
    document.getElementById('stockActual').value = variante.stockActual;
    document.getElementById('estadoActivo').value = Number(variante.estadoActivo);
};

document.getElementById('formVariante').addEventListener('submit', async (evento) => {
    evento.preventDefault();
    try {
        const respuesta = await fetch(`/api/variantes/${varianteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                talla: document.getElementById('talla').value,
                color: document.getElementById('color').value,
                stockActual: Number(document.getElementById('stockActual').value),
                estadoActivo: Number(document.getElementById('estadoActivo').value),
                id_producto: Number(productoId)
            })
        });
        const resultado = await respuesta.json();
        if (!respuesta.ok) throw new Error(resultado.mensaje || 'No se pudo actualizar la variante');
        window.location.href = urlVolver;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

cargarVariante().catch((error) => {
    console.error(error);
    alert(error.message);
});
