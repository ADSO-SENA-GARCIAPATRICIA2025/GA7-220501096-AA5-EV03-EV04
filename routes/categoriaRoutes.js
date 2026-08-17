
import express from 'express';
import {
    listarCategorias,
    buscarCategoriaPorId,
    registrarCategoria,
    modificarCategoria,
    borrarCategoria
} from '../controllers/categoriaController.js';

const router = express.Router();

router.get('/', listarCategorias);
router.get('/:id', buscarCategoriaPorId);
router.post('/', registrarCategoria);
router.put('/:id', modificarCategoria);
router.delete('/:id', borrarCategoria);

export default router;