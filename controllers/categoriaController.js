import {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
} from '../models/categoriaModel.js';


// GET - Listar categorías
export const listarCategorias = async (req, res) => {
    try {
        const categorias = await obtenerCategorias();

        res.status(200).json(categorias);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener las categorías'
        });
    }
};


// GET - Buscar categoría por ID
export const buscarCategoriaPorId = async (req, res) => {
    try {
        const categoria = await obtenerCategoriaPorId(req.params.id);

        if (!categoria) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.status(200).json(categoria);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener la categoría'
        });
    }
};


// POST - Crear categoría
export const registrarCategoria = async (req, res) => {
    try {
        const idCategoria = await crearCategoria(req.body);

        res.status(201).json({
            mensaje: 'Categoría creada correctamente',
            id_categoria: idCategoria
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear la categoría'
        });
    }
};


// PUT - Actualizar categoría
export const modificarCategoria = async (req, res) => {
    try {
        const filasAfectadas = await actualizarCategoria(
            req.params.id,
            req.body
        );

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Categoría actualizada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar la categoría'
        });
    }
};


// DELETE - Eliminar categoría
export const borrarCategoria = async (req, res) => {
    try {
        const filasAfectadas = await eliminarCategoria(req.params.id);

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Categoría eliminada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar la categoría'
        });
    }
};