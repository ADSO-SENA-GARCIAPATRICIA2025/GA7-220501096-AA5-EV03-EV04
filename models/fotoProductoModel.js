import db from '../config/db.js';

// GET - Obtener todas las fotos
export const obtenerFotos = async () => {
    const [fotos] = await db.query(`
        SELECT
            id_foto,
            url_foto,
            orden,
            estadoActivo,
            id_producto
        FROM foto_producto
    `);

    return fotos;
};


// GET - Obtener foto por ID
export const obtenerFotoPorId = async (id) => {
    const [fotos] = await db.query(`
        SELECT
            id_foto,
            url_foto,
            orden,
            estadoActivo,
            id_producto
        FROM foto_producto
        WHERE id_foto = ?
    `, [id]);

    return fotos[0];
};


// POST - Crear foto
export const crearFoto = async (foto) => {
    const {
        url_foto,
        orden,
        id_producto
    } = foto;

    const [resultado] = await db.query(`
        INSERT INTO foto_producto
        (
            url_foto,
            orden,
            id_producto
        )
        VALUES (?, ?, ?)
    `, [
        url_foto,
        orden,
        id_producto
    ]);

    return resultado.insertId;
};


// PUT - Actualizar foto
export const actualizarFoto = async (id, foto) => {
    const {
        url_foto,
        orden,
        estadoActivo,
        id_producto
    } = foto;

    const [resultado] = await db.query(`
        UPDATE foto_producto
        SET
            url_foto = ?,
            orden = ?,
            estadoActivo = ?,
            id_producto = ?
        WHERE id_foto = ?
    `, [
        url_foto,
        orden,
        estadoActivo,
        id_producto,
        id
    ]);

    return resultado.affectedRows;
};


// DELETE - Eliminar foto
export const eliminarFoto = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM foto_producto
        WHERE id_foto = ?
    `, [id]);

    return resultado.affectedRows;
};