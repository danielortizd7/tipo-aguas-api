const express = require("express");
const router = express.Router();
const {
  obtenerTiposAgua,
  crearTipoAgua,
  actualizarTipoAgua,
  eliminarTipoAgua
} = require("../controllers/tipoAguaController"); // ✅ Importación correcta

// Definir rutas
router.get("/", obtenerTiposAgua);
router.post("/", crearTipoAgua);
router.put("/actualizar/:id", actualizarTipoAgua);
router.delete("/eliminar/:id", eliminarTipoAgua);

module.exports = router;
