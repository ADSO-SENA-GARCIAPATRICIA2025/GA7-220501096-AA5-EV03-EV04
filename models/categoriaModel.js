import db from '../config/db.js';

// GET - Obtener todas las categorías
export const obtenerCategorias = async () => {
    const [categorias] = await db.query(`
        SELECT
            id_categoria,
            nombre,
            descripcion,
            estadoActivo,
            fechaCreacion
        FROM categoria
    `);

    return categorias;
};


// GET - Obtener categoría por ID
export const obtenerCategoriaPorId = async (id) => {
    const [categorias] = await db.query(`
        SELECT
            id_categoria,
            nombre,
            descripcion,
            estadoActivo,
            fechaCreacion
        FROM categoria
        WHERE id_categoria = ?
    `, [id]);

    return categorias[0];
};


// POST - Crear categoría
export const crearCategoria = async (categoria) => {
    const {
        nombre,
        descripcion
    } = categoria;

    const [resultado] = await db.query(`
        INSERT INTO categoria
        (
            nombre,
            descripcion
        )
        VALUES (?, ?)
    `, [
        nombre,
        descripcion
    ]);

    return resultado.insertId;
};


// PUT - Actualizar categoría
export const actualizarCategoria = async (id, categoria) => {
    const {
        nombre,
        descripcion,
        estadoActivo
    } = categoria;

    const [resultado] = await db.query(`
        UPDATE categoria
        SET
            nombre = ?,
            descripcion = ?,
            estadoActivo = ?
        WHERE id_categoria = ?
    `, [
        nombre,
        descripcion,
        estadoActivo,
        id
    ]);

    return resultado.affectedRows;
};


// DELETE - Eliminar categoría
export const eliminarCategoria = async (id) => {
    const [resultado] = await db.query(`
        DELETE FROM categoria
        WHERE id_categoria = ?
    `, [id]);

    return resultado.affectedRows;
};