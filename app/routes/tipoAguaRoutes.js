const express = require('express');
const router = express.Router();
const TipoAguaController = require('../controllers/tipoAguaController');

router.get('/', TipoAguaController.obtenerTiposAgua);
router.post('/', TipoAguaController.registrarTipoAgua);
router.delete('/eliminar/:id', TipoAguaController.eliminarTipoAgua);
router.put('/actualizar/:id', TipoAguaController.actualizarTipoAgua);

module.exports = router;
