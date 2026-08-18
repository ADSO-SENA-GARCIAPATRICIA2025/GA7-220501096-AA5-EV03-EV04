import {
    obtenerVariantes,
    obtenerVariantesPorProducto,
    obtenerVariantePorId,
    crearVariante,
    actualizarVariante,
    eliminarVariante
} from '../models/varianteProductoModel.js';


// GET - Listar variantes
export const listarVariantes = async (req, res) => {
    try {
        const variantes = await obtenerVariantes();

        res.status(200).json(variantes);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener las variantes'
        });
    }
};


// GET - Buscar variante por ID
export const buscarVariantePorId = async (req, res) => {
    try {
        const variante = await obtenerVariantePorId(req.params.id);

        if (!variante) {
            return res.status(404).json({
                mensaje: 'Variante no encontrada'
            });
        }

        res.status(200).json(variante);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener la variante'
        });
    }
};


// POST - Crear variante
export const registrarVariante = async (req, res) => {
    try {
        const idVariante = await crearVariante(req.body);

        res.status(201).json({
            mensaje: 'Variante creada correctamente',
            id_varianteProducto: idVariante
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear la variante'
        });
    }
};


// PUT - Actualizar variante
export const modificarVariante = async (req, res) => {
    try {
        const filasAfectadas = await actualizarVariante(
            req.params.id,
            req.body
        );

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Variante no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Variante actualizada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar la variante'
        });
    }
};


// DELETE - Eliminar variante
export const borrarVariante = async (req, res) => {
    try {
        const filasAfectadas = await eliminarVariante(req.params.id);

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Variante no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Variante eliminada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar la variante'
        });
    }
};

export const listarVariantesPorProducto = async (req, res) => {
    try {
        const variantes = await obtenerVariantesPorProducto(req.params.productoId);
        res.status(200).json(variantes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las variantes del producto' });
    }
};
