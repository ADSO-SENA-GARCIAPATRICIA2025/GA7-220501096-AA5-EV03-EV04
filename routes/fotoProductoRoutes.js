import express from 'express';

import {
    listarFotos,
    buscarFotoPorId,
    registrarFoto,
    modificarFoto,
    borrarFoto
} from '../controllers/fotoProductoController.js';

const router = express.Router();

router.get('/', listarFotos);
router.get('/:id', buscarFotoPorId);
router.post('/', registrarFoto);
router.put('/:id', modificarFoto);
router.delete('/:id', borrarFoto);

export default router;