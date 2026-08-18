import express from 'express';

import {
    listarVariantes,
    listarVariantesPorProducto,
    buscarVariantePorId,
    registrarVariante,
    modificarVariante,
    borrarVariante
} from '../controllers/varianteProductoController.js';

const router = express.Router();

router.get('/', listarVariantes);
router.get('/producto/:productoId', listarVariantesPorProducto);
router.get('/:id', buscarVariantePorId);
router.post('/', registrarVariante);
router.put('/:id', modificarVariante);
router.delete('/:id', borrarVariante);

export default router;
