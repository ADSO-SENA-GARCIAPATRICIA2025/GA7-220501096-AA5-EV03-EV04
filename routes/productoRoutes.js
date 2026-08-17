import express from 'express';
import {
    listarProductos,
    buscarProductoPorId, 
    registrarProducto,
    modificarProducto
} from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', buscarProductoPorId);
router.post('/', registrarProducto);
router.put('/:id', modificarProducto);

export default router;