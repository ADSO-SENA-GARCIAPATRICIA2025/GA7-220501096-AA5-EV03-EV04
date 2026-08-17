import db from '../config/db.js';

// GET - Obtener todas las variantes
export const obtenerVariantes = async () => {
    const [variantes] = await db.query(`
        SELECT
            id_varianteProducto,
            talla,
            color,
            stockActual,
            estadoActivo,
            id_producto
        FROM variante_producto
    `);

    return variantes;
};


// GET - Obtener variante por ID
export const obtenerVariantePorId = async (id) => {
    const [variantes] = await db.query(`
        SELECT
            id_varianteProducto,
            talla,
            color,
            stockActual,
            estadoActivo,
            id_producto
        FROM variante_producto
        WHERE id_varianteProducto = ?
    `, [id]);

    return variantes[0];
};


// POST - Crear variante
export const crearVariante = async (variante) => {
    const {
        talla,
        color,
        stockActual,
        id_producto
    } = variante;

    const [resultado] = await db.query(`
        INSERT INTO variante_producto
        (
            talla,
            color,
            stockActual,
            id_producto
        )
        VALUES (?, ?, ?, ?)
    `, [
        talla,
        color,
        stockActual,
        id_producto
    ]);

    return resultado.insertId;
};


// PUT - Actualizar variante
export const actualizarVariante = async (id, variante) => {
    const {
        talla,
        color,
        stockActual,
        estadoActivo,
        id_producto
    } = variante;

    const [resultado] = await db.query(`
        UPDATE variante_producto
        SET
            talla = ?,
            color = ?,
            stockActual = ?,
            estadoActivo = ?,
            id_producto = ?
        WHERE id_varianteProducto = ?
    `, [
        talla,
        color,
        stockActual,
        estadoActivo,
        id_producto,
        id
    ]);

    return resultado.affectedRows;
};


// DELETE - Eliminar variante
export const eliminarVariante = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM variante_producto
        WHERE id_varianteProducto = ?
    `, [id]);

    return resultado.affectedRows;
};