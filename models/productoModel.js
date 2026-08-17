import db from '../config/db.js';

//GET TODOS LOS PRODUCTOS 
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

//GET PRODUCTOS POR ID
export const obtenerProductoPorId = async (id) => {
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
        WHERE p.id_producto = ?
    `, [id]);

    return productos[0];
};