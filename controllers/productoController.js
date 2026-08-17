import { obtenerProductos,
    obtenerProductoPorId, 
    crearProducto } from '../models/productoModel.js';

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

    export const buscarProductoPorId = async (req, res) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener el producto'
        });
    }
    };

    export const registrarProducto = async (req, res) => {
    try {
        const idProducto = await crearProducto(req.body);

        res.status(201).json({
            mensaje: 'Producto creado correctamente',
            id_producto: idProducto
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }
};
