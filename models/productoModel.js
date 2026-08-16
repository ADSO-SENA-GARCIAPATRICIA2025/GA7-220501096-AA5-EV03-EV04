import db from '../config/db.js';

export const obtenerProductos = async () => {
    const [productos] = await db.query(`
        SELECT
            p.id_producto,
            p.codigoProducto,
            p.nombreProducto,
            p.descripcion,
            p.marca,
            p.precioVenta,
            p.publicoObjetivo,
            p.estadoActivo,
            p.fechaCreacion,
            c.nombre AS categoria
        FROM producto p
        INNER JOIN categoria c
            ON p.id_categoria = c.id_categoria
    `);

    return productos;
};