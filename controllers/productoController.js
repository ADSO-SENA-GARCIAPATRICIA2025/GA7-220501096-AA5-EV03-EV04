import { obtenerProductos } from '../models/productoModel.js';

export const listarProductos = async (req, res) => {
    try {
        const productos = await obtenerProductos();

        res.status(200).json(productos);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener los productos'
        });
    }
};