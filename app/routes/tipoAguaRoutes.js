const express = require("express");
const router = express.Router();
const TipoAguaController = require("../controllers/tipoAguaController"); // ✔ Verifica la ruta correcta

// Verifica que estas funciones existen en el controlador
if (!TipoAguaController.obtenerTiposAgua) {
  throw new Error("🚨 Error: obtenerTiposAgua no está definido en tipoAguaController.js");
}
if (!TipoAguaController.crearTipoAgua) {
  throw new Error("🚨 Error: crearTipoAgua no está definido en tipoAguaController.js");
}

// Definir rutas
router.get("/", TipoAguaController.obtenerTiposAgua);
router.post("/", TipoAguaController.crearTipoAgua);
router.put("/actualizar/:id", TipoAguaController.actualizarTipoAgua);
router.delete("/eliminar/:id", TipoAguaController.eliminarTipoAgua);

module.exports = router;
