const TipoAguaService = require('../services/tipoAguaService');

class TipoAguaController {
    static async obtenerTiposAgua(req, res) {
        try {
            const tipos = await TipoAguaService.obtener();
            res.json(tipos);
        } catch (e) {
            res.status(500).json({ error: 'Error al obtener tipos de agua', detalle: e.message });
        }
    }

    static async registrarTipoAgua(req, res) {
        try {
            const nuevoTipo = await TipoAguaService.registrar(req.body);
            res.status(201).json(nuevoTipo);
        } catch (e) {
            res.status(500).json({ error: 'Error al registrar tipo de agua', detalle: e.message });
        }
    }

    static async eliminarTipoAgua(req, res) {
        try {
            const eliminado = await TipoAguaService.eliminar(req.params.id);
            if (!eliminado) {
                return res.status(404).json({ error: 'Tipo de agua no encontrado' });
            }
            res.json({ mensaje: `Tipo de agua ${req.params.id} eliminado` });
        } catch (e) {
            res.status(500).json({ error: 'Error al eliminar tipo de agua', detalle: e.message });
        }
    }

    static async actualizarTipoAgua(req, res) {
        try {
            const tipoActualizado = await TipoAguaService.actualizar(req.params.id, req.body);
            if (!tipoActualizado) {
                return res.status(404).json({ error: 'Tipo de agua no encontrado' });
            }
            res.json(tipoActualizado);
        } catch (e) {
            res.status(500).json({ error: 'Error al actualizar tipo de agua', detalle: e.message });
        }
    }
}

module.exports = TipoAguaController;
