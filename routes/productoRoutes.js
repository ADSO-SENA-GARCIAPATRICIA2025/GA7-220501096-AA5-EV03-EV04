import express from 'express';
import {
    listarProductos,
    buscarProductoPorId, 
    registrarProducto,
    modificarProducto,
    borrarProducto

} from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', buscarProductoPorId);
router.post('/', registrarProducto);
router.put('/:id', modificarProducto);
router.delete('/:id', borrarProducto);

export default router;