import {
    obtenerFotos,
    obtenerFotoPorId,
    crearFoto,
    actualizarFoto,
    eliminarFoto
} from '../models/fotoProductoModel.js';


// GET - Listar fotos
export const listarFotos = async (req, res) => {
    try {
        const fotos = await obtenerFotos();

        res.status(200).json(fotos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener las fotos'
        });
    }
};


// GET - Buscar foto por ID
export const buscarFotoPorId = async (req, res) => {
    try {
        const foto = await obtenerFotoPorId(req.params.id);

        if (!foto) {
            return res.status(404).json({
                mensaje: 'Foto no encontrada'
            });
        }

        res.status(200).json(foto);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener la foto'
        });
    }
};


// POST - Crear foto
export const registrarFoto = async (req, res) => {
    try {
        const idFoto = await crearFoto(req.body);

        res.status(201).json({
            mensaje: 'Foto creada correctamente',
            id_foto: idFoto
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear la foto'
        });
    }
};


// PUT - Actualizar foto
export const modificarFoto = async (req, res) => {
    try {
        const filasAfectadas = await actualizarFoto(
            req.params.id,
            req.body
        );

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Foto no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Foto actualizada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar la foto'
        });
    }
};


// DELETE - Eliminar foto
export const borrarFoto = async (req, res) => {
    try {
        const filasAfectadas = await eliminarFoto(req.params.id);

        if (filasAfectadas === 0) {
            return res.status(404).json({
                mensaje: 'Foto no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Foto eliminada correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar la foto'
        });
    }
};