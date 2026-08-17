import express from 'express';
import {
    listarProductos,
    buscarProductoPorId, 
    registrarProducto
} from '../controllers/productoController.js';

const router = express.Router();

router.get('/', listarProductos);
router.get('/:id', buscarProductoPorId);
router.post('/', registrarProducto);

export default router;